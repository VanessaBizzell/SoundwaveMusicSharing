import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; //imports cors middleware
import router from "./router";
import multer from "multer";
import upload, { saveToGridFS } from './utils/upload';

// const upload = multer({ dest: "uploads/" });
import * as Middleware from "./middleware";
import cookieParser from "cookie-parser";
import { createMusicPost } from "./musicController";
import * as UserController from "./userController";


// const { auth, requiresAuth } = require('express-openid-connect');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//Enables CORS for a specific origin
const corsOptions = {
  origin: "http://localhost:4200",
  optionSuccessStatus: 200, //to avoid issues with legacy browsers,
};

//Enable All CORS Requests
app.use(
  cors({
    origin: "http://localhost:4200",
    // optionSuccessStatus: 200, //to avoid issues with legacy browsers,
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

var session = require("express-session");
app.use(cookieParser());
// app.use(session(Middleware.session));

// Connect to MongoDB and initialize GridFS bucket
let bucket: InstanceType<typeof mongoose.mongo.GridFSBucket> | undefined;
mongoose.connection.on("connected", () => {
  if (mongoose.connection.db) {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "filesBucket",
    });
    console.log("GridFSBucket initialized successfully");
  } else {
    console.error(
      "Failed to initialize GridFSBucket: mongoose.connection.db is undefined"
    );
  }
});


export { bucket };

var session = require('express-session')

app.use(cookieParser('KEY'))


async function main() {
  await mongoose.connect(process.env.MONGODB_URL as string);
  console.log(`Successfully connected to MongoDB!`);
  // Start the server after the connection is established
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

main().catch((error) => console.error(error));

// /****** AUTH0 LOGIN SCREEN STUFF ******/

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3001',
//   clientID: 'qe6Xm5OLCUY5IxPbG1riKmOECkJHtQDI',
//   issuerBaseURL: 'https://dev-ib3bna8dxfvytg5v.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get('/', (req: any, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

/****************************************/

/*
router.use((req, res, next) => {
  console.log(Middleware.session)
  next();
})
*/


router.use(Middleware.authenticateRequest)


// Use the imported router
app.use("/api", router);


// Endpoint to check if bucket is ready
app.get("/api/bucket-status", (req: Request, res: Response) => {
  if (bucket) {
    res.status(200).json({ message: "GridFSBucket is ready" });
  } else {
    res.status(500).json({ message: "GridFSBucket is not initialized" });
  }
});


// Create a new music post with file upload
app.post('/upload/file', upload.single('file'), saveToGridFS, createMusicPost);


app.get("/", (request: Middleware.CustomRequest, response: Response) => {
  response.send("Express + TypeScript Server");
});

app.post('/login', UserController.validateLogin)
app.post('/signup', UserController.signup)
app.post('/logout', UserController.logout)
app.post("/current-user", UserController.getCurrentUser)

// Error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});
