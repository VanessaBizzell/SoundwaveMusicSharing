
import express, { NextFunction } from "express";
import { Request, Response } from 'express';

import * as Middleware from './middleware'

const router = express.Router();

const qq = async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json({"qq": "qq2"});
}

// Import the controllers
import { createMusicPost, getMusicPosts, getMusicPostByID, submitComment } from './musicController';
import * as UserController from './userController'
 
// Define the routes
router.post('/login', UserController.requestToken)
router.post('/signup', UserController.signup)

router.post('/music', createMusicPost); // Create a new music post
router.get('/music', Middleware.authenticateRequest, getMusicPosts); // Get all music posts
router.get('/music/:id', getMusicPostByID); // Get a single music post
// router.put('/music/:id', submitComment); // Update a music post with a comment
router.patch('/music/:id', submitComment as express.RequestHandler);

export default router;