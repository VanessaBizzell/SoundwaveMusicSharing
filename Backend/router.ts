import express from "express";
const router = express.Router();

// Import the controllers
import { createMusicPost, getMusicPosts, getMusicPostByID, submitComment } from './musicController';
import * as UserController from './userController'

// Define the routes
router.post('/login', UserController.requestToken)

router.post('/music', createMusicPost); // Create a new music post
router.get('/music', getMusicPosts); // Get all music posts
router.get('/music/:id', getMusicPostByID); // Get a single music post
router.put('/music/:id', submitComment); // Update a music post with a comment

export default router;