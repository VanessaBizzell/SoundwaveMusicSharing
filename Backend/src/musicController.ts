import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import MusicPost from './schemas/music'
import User from './schemas/User';

// Create a new music post
const createMusicPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            trackName,
            trackLink,
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

        const newMusicPost = await MusicPost.create({
            trackName,
            trackLink,
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

        res.status(201).json({ message: "Music Posted!", post: newMusicPost });
    } catch (error) {
        if (error instanceof Error) {
            next(createError(400, error.message));
        } else {
            next(createError(400, 'Music post could not be saved'));
        }
    }
};

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
            return res.status(404).json({ message: "Music post not found" });
        }
    
        res.status(200).json({ message: "Comment submitted", musicPost });
    } catch (error) {
        console.error("Error submitting comment", error);
        next(createError(500, "Comment could not be submitted"));
    }
};


     
export { createMusicPost, getMusicPosts, getMusicPostByID, submitComment };