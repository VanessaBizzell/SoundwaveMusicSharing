import express, { Express, Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; //imports cors middleware
import router from "./router";

import * as Middleware from "./middleware";

const { auth, requiresAuth } = require('express-openid-connect');


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

var session = require('express-session')

app.use(session(Middleware.session))

 //Enables CORS for a specific origin
 const corsOPtions = {
   origin: "http://localhost:4200",
   optionSuccessStatus: 200 //to avoid issues with legacy browsers
 }

//Enable All CORS Requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());       

async function main() {
  const connection = await mongoose.connect(process.env.MONGODB_URL as string);
  console.log(`Successfully connected to MongoDB!\n${connection.connection.host}`);
}                       

main().catch(error => console.error(error));

router.use((req, res, next) => {
  console.log(Middleware.session)
  next();
})

router.use(Middleware.authenticateRequest)

// Use the imported router
app.use("/api", router);

app.get('/api/page', (req: Request, res: Response) => {
  res.status(200).json({ "qq": "Q_q" })
}) 

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
 // res.send(
    //req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  //)
});

// Error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});