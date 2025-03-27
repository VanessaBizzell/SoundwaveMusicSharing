import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { GridFSBucket, ObjectId } from 'mongodb';

// Extend the Request type to include fileId
declare global {
  namespace Express {
    interface Request {
      fileId?: ObjectId;
    }
  }
}

// Configure multer to store files in memory
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB file size limit
  }
});

export const saveToGridFS = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Ensure MongoDB connection is established
    const db = mongoose.connection.db;
    if (!db) {
      return res.status(500).json({ message: 'MongoDB connection not established' });
    }

    // Create GridFS Bucket
    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: 'filesBucket'
    });

    // Open upload stream
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      metadata: {
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });

    // Pipe the file buffer to GridFS
    uploadStream.write(req.file.buffer);
    uploadStream.end();

    // Wait for the upload to complete and get the file ID
    const fileId = await new Promise<ObjectId>((resolve, reject) => {
      uploadStream.on('finish', () => {
        resolve(uploadStream.id);
      });
      uploadStream.on('error', reject);
    });

    // Attach the file ID to the request object
    req.fileId = fileId;

    next();
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ 
      message: 'File upload failed', 
      error: error instanceof Error ? error.message : error 
    });
  }
};

export default upload;


// import multer from 'multer';
// import { Request, Response, NextFunction } from 'express';
// import mongoose from 'mongoose';
// import { GridFSBucket } from 'mongodb';
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables from .env file

// let bucket: GridFSBucket;

// // Initialize GridFSBucket when MongoDB connects
// //FIles are stored in the filesBucket collection in the database.
// //The GridFSBucket class is used to interact with the filesBucket collection.
// mongoose.connection.on('connected', () => {
//   if (mongoose.connection.db) {
//     bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//       bucketName: 'filesBucket',
//     });
//     console.log('GridFSBucket initialized successfully');
//   }
// });

// // Configure Multer to store files in memory
// //multer.memoryStorage() is used to store the uploaded file in memory as a Buffer.
// //This allows you to manually handle the file and write it to GridFS.
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Middleware to save file to GridFS
// export const saveToGridFS = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const { originalname, buffer } = req.file;

//     // Create a writable stream to GridFS
//     const uploadStream = bucket.openUploadStream(originalname);

//     // Write the file buffer to GridFS
//     uploadStream.end(buffer);

//     uploadStream.on('finish', () => {
//       console.log(`File uploaded successfully: ${uploadStream.id}`);
//       req.fileId = uploadStream.id; // Attach the file ID to the request object
//       next();
//     });

//     uploadStream.on('error', (err) => {
//       console.error('Error uploading file to GridFS:', err);
//       res.status(500).json({ message: 'Error uploading file', error: err });
//     });
//   } catch (error) {
//     console.error('Error in saveToGridFS middleware:', error);
//     res.status(500).json({ message: 'Error uploading file', error });
//   }
// };

// export default upload;



// // import multer, { StorageEngine } from 'multer';
// // import { GridFsStorage } from 'multer-gridfs-storage';
// // import dotenv from 'dotenv';
// // import { Request } from 'express';

// // dotenv.config(); // Load environment variables from .env file

// // // Create storage engine
// // export function upload() {
// //   const mongodbUrl = process.env.MONGODB_URL as string;
// //   const storage = new GridFsStorage({
// //     url: mongodbUrl,
// //     options: { useNewUrlParser: true, useUnifiedTopology: true },
// //     file: (_: Request, file) => {
// //       return new Promise((resolve, _reject) => {
// //         const fileInfo = {
// //           filename: file.originalname,
// //           bucketName: "filesBucket",
// //         };
// //         resolve(fileInfo);
// //       });
// //     },
// //   });

// //   return multer({ storage });
// // }

// // export default upload;