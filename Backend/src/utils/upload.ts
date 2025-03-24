import multer, { StorageEngine } from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config(); // Load environment variables from .env file

// Create storage engine
export function upload() {
  const mongodbUrl = process.env.MONGODB_URL as string;
  const storage = new GridFsStorage({
    url: mongodbUrl,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      return new Promise((resolve, _reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "filesBucket",
        };
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage });
}

export default upload;