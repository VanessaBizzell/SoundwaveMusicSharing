//this is a TypeScript declaration file that extends the Express Request object to include a fileId property.
// This will allow us to attach the file ID to the request object in the saveToGridFS middleware and access it in the createMusicPost controller.
// This is necessary because the file ID is generated asynchronously after the file is uploaded to GridFS, and we need to pass it to the createMusicPost controller to create a new music post.
import { ObjectId } from 'mongodb';

declare global {
  namespace Express {
    interface Request {
      fileId?: ObjectId; // Add the fileId property to the Request object
    }
  }
}