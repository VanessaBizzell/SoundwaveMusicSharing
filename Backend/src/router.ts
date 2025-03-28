
import express, { NextFunction } from "express";
import { Request, Response } from 'express';


import * as Middleware from './middleware'
// import upload from './utils/upload';

const router = express.Router();

// Import the controllers
import { 
    // createMusicPost,
     getMusicPosts,
      getMusicPostByID, 
      submitComment, 
      streamAudioFile,
      getUserMusic
     } from './musicController';
import * as UserController from './userController'
 
// Define the routes
router.post('/signup', UserController.signup)

// router.post('/music', upload.single("file"), createMusicPost);
// router.post('/music', createMusicPost); // Create a new music post
router.get('/music', Middleware.authenticateRequest, getMusicPosts); // Get all music posts
router.get('/music/:id', getMusicPostByID); // Get a single music post
router.get('/music/user/:id', Middleware.authenticateRequest, getUserMusic); // Get a single music post
// router.put('/music/:id', submitComment); // Update a music post with a comment
router.patch('/music/:id', submitComment as express.RequestHandler);
// Stream an audio file from GridFS
router.get('/stream/:fileId', streamAudioFile);


export default router;
