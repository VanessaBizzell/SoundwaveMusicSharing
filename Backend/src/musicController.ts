import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import MusicPost from './schemas/music';
import User from './schemas/User';
import { bucket } from './index';
import mongoose from 'mongoose';


// Create a new music post with file upload
const createMusicPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Log the incoming file and body for debugging
        console.log("createMusicPost endpoint hit");
        console.log("File:", req.file);
        console.log("Body:", req.body);
        console.log("File ID:", req.fileId);

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No track file uploaded' });
        }

        // Check if fileId is available from the upload middleware
        if (!req.fileId) {
            return res.status(400).json({ message: 'File upload failed' });
        }

        const {
            trackName,
            artist,
            album,
            recordedDate,
            coverArt,
            sourcedFrom,
            genre,
            availableForSale,
            price,
            comment,
            userID
        } = req.body;

        // Use the GridFS file ID as the trackLink
        const trackLink = req.fileId.toString();

        const newMusicPost = await MusicPost.create({
            trackName,
            trackLink, // Now using the GridFS file ID
            artist,
            album,
            recordedDate,
            coverArt,
            sourcedFrom,
            genre,
            availableForSale,
            price,
            comment: comment || [], // Initialize empty array for comments if not provided
            postedBy: userID
        });

        const user = await User.findById(userID);
        if (user) {
            user.musicPosts = user.musicPosts || [];
            user.musicPosts.push(newMusicPost._id);
            await user.save();
        }

        res.status(201).json({ 
            message: "Music Posted!", 
            post: newMusicPost,
            fileId: trackLink // Return the file ID for reference
        });
    } catch (error) {
        console.error('Error in createMusicPost:', error);
        if (error instanceof Error) {
            next(createError(400, error.message));
        } else {
            next(createError(400, 'Music post could not be saved'));
        }
    }
};

const streamAudioFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fileId } = req.params;

        // Validate fileId
        if (!fileId) {
            return res.status(400).json({ error: { text: "File ID is required" } });
        }

        if (!bucket) {
            return res.status(500).json({ error: { text: "GridFSBucket is not initialized" } });
        }

        let objectId: mongoose.Types.ObjectId;
        try {
            objectId = new mongoose.Types.ObjectId(fileId);
        } catch (idError) {
            return res.status(400).json({ error: { text: "Invalid file ID format" } });
        }

        // Check if file exists
        const files = await bucket.find({ _id: objectId }).toArray();
        if (files.length === 0) {
            return res.status(404).json({ error: { text: "File not found" } });
        }

        const file = files[0];

        // Determine content type
        const contentType = file.metadata?.contentType || 
                            file.metadata?.mimetype || 
                            "application/octet-stream";

        // Support partial content for streaming
        const range = req.headers.range;
        
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : file.length - 1;
            
            const chunksize = (end - start) + 1;
            
            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${file.length}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': contentType,
                'Content-Disposition': `inline; filename="${file.filename}"`
            });

            const downloadStream = bucket.openDownloadStream(objectId, {
                start,
                end: end + 1
            });

            downloadStream.pipe(res);
        } else {
            // Full file download
            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Length': file.length,
                'Content-Disposition': `inline; filename="${file.filename}"`
            });

            const downloadStream = bucket.openDownloadStream(objectId);
            downloadStream.pipe(res);
        }

    } catch (error) {
        console.error('Audio streaming error:', error);
        res.status(500).json({ 
            error: { 
                text: 'Unable to stream file', 
                details: error instanceof Error ? error.message : error 
            } 
        });
    }
};



// // Create a new music post with file upload
// const createMusicPost = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // Log the incoming file and body for debugging
//         console.log("createMusicPost endpoint hit");
//         console.log("File:", req.file);
//         console.log("Body:", req.body);

//         // req.file contains the uploaded file info after the upload.single("file") middleware runs
//         if (!req.file) {
//             res.status(400).json({ message: 'No track file uploaded' });
//             return;
//         }

//         const {
//             trackName,
//             artist,
//             album,
//             recordedDate,
//             coverArt,
//             sourcedFrom,
//             genre,
//             availableForSale,
//             price,
//             comment,
//             userID
//         } = req.body;

//         // Use the file ID as the trackLink
//         const trackLink = req.file.filename ? req.file.filename.toString() : null;
       

//         const newMusicPost = await MusicPost.create({
//             trackName,
//             trackLink, // This will now be the GridFS file ID
//             artist,
//             album,
//             recordedDate,
//             coverArt,
//             sourcedFrom,
//             genre,
//             availableForSale,
//             price,
//             comment: comment || [], // Initialize empty array for comments if not provided
//             postedBy: userID
//         });

//         const user = await User.findById(userID);
//         if (user) {
//             user.musicPosts = user.musicPosts || [];
//             user.musicPosts.push(newMusicPost._id);
//             await user.save();
//         }

//         res.status(201).json({ message: "Music Posted!", post: newMusicPost });
//     } catch (error) {
//         if (error instanceof Error) {
//             next(createError(400, error.message));
//         } else {
//             next(createError(400, 'Music post could not be saved'));
//         }
//     }
// };



// // Stream an audio file from GridFS
// const streamAudioFile = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { fileId } = req.params;

//         if (!bucket) {
//             return res.status(500).json({ error: { text: "GridFSBucket is not initialized" } });
//         }

//         // Check if file exists
//         const file = await bucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();
//         if (file.length === 0) {
//             return res.status(404).json({ error: { text: "File not found" } });
//         }

//         // Set the headers
//         res.set("Content-Type", file[0].metadata?.contentType || "application/octet-stream");
//         res.set("Content-Disposition", `inline; filename=${file[0].filename}`);

//         // Create a stream to read from the bucket
//         const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

//         // Pipe the stream to the response
//         downloadStream.pipe(res);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ error: { text: `Unable to stream file`, error } });
//     }
// };

// // Create a new music post
// const createMusicPost = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const {
//             trackName,
//             trackLink,
//             artist,
//             album,
//             recordedDate,
//             coverArt,
//             sourcedFrom,
//             genre,
//             availableForSale,
//             price,
//             comment,
//             userID
//         } = req.body;

//         const newMusicPost = await MusicPost.create({
//             trackName,
//             trackLink,
//             artist,
//             album,
//             recordedDate,
//             coverArt,
//             sourcedFrom,
//             genre,
//             availableForSale,
//             price,
//             comment: comment || [], // Initialize empty array for comments if not provided
//             postedBy: userID
//         });

//         const user = await User.findById(userID);
//         if (user) {
//             user.musicPosts = user.musicPosts || [];
//             user.musicPosts.push(newMusicPost._id);
//             await user.save();
//         }

//         res.status(201).json({ message: "Music Posted!", post: newMusicPost });
//     } catch (error) {
//         if (error instanceof Error) {
//             next(createError(400, error.message));
//         } else {
//             next(createError(400, 'Music post could not be saved'));
//         }
//     }
// };



const getMusicPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musicPosts = await MusicPost.find().populate({
            path: "postedBy",
            select: "username",
            model: "User",
        });
        if (musicPosts.length === 0) {
            res.status(404).json({ message: "No music posts yet" });
            return;
        }
        res.status(200).json({ musicPosts });
    } catch (error) {
        next(createError(400, "Music posts could not be retrieved"));
    }
};

const getMusicPostByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musicPost = await MusicPost.findById(req.params.id).populate({
            path: "postedBy",
            select: "username",
            model: "User",
        });
        if (!musicPost) {
            res.status(404).json({ message: "Music post not found" });
            return;
        }
        res.status(200).json({ musicPost });
    } catch (error) {
        next(createError(400, "Music post could not be retrieved"));
    }
};

const submitComment = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const { comment } = req.body;

        const musicPost = await MusicPost.findByIdAndUpdate(
            req.params.id,
            { $push: { comment: comment } },
            { new: true }
        );
       
        if (!musicPost) {
            res.status(404).json({ message: "Music post not found" });
            return;
        }
    
        res.status(200).json({ message: "Comment submitted", musicPost });
    } catch (error) {
        console.error("Error submitting comment", error);
        next(createError(500, "Comment could not be submitted"));
    }
};

export { getMusicPosts, getMusicPostByID, submitComment, createMusicPost, streamAudioFile };