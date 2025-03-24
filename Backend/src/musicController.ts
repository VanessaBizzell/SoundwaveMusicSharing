import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
// import upload from './gridFsStorage'; // Import your multer/GridFS setup

import MusicPost from './schemas/music';
import User from './schemas/User';

// // Middleware for handling file upload
// export const uploadTrack = upload.single('trackFile');

// // Create a new music post with file upload
// export const createMusicPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         // req.file contains the uploaded file info after the uploadTrack middleware runs
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
//             userId
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
//             availableForSale: availableForSale === 'true', // Convert string to boolean if needed
//             price,
//             comment: comment || [], // Initialize empty array for comments if not provided
//             postedBy: userId
//         });

//         res.status(201).json({
//             success: true,
//             message: 'Music post created successfully',
//             data: newMusicPost
//         });
//     } catch (error) {
//         console.error('Error creating music post:', error);
//         next(error);
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

export { getMusicPosts, getMusicPostByID, submitComment, };