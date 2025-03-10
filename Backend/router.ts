import express from "express";
const router = express.Router();

// Import the controllers
import { createMusicPost, getMusicPosts } from './musicController';

// Define the routes
router.post('/music', createMusicPost); // Create a new music post
router.get('/music', getMusicPosts); // Get all music posts

export default router;