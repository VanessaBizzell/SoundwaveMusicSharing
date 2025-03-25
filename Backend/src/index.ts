import express, { Express, Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; //imports cors middleware
import router from "./router";

import * as Middleware from "./middleware";
import * as UserController from "./userController"

const { auth, requiresAuth } = require('express-openid-connect');
const cookieParser = require("cookie-parser");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

 //Enables CORS for a specific origin
 const corsOptions = {
  origin: "http://localhost:4200",
  optionSuccessStatus: 200 //to avoid issues with legacy browsers,
}

//Enable All CORS Requests
app.use(cors({
  origin: "http://localhost:4200",
  // optionSuccessStatus: 200, //to avoid issues with legacy browsers,
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());     

var session = require('express-session')

app.use(cookieParser('KEY'))

async function main() {
  const connection = await mongoose.connect(process.env.MONGODB_URL as string);
  console.log(`Successfully connected to MongoDB!\n${connection.connection.host}`);
}                       

main().catch(error => console.error(error));

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

app.get("/", (request: Middleware.CustomRequest, response: Response) => {
  response.cookie("token", "qq")
  response.send("Express + TypeScript Server");
  console.log("token cookie:", request.cookies.token )
  console.log("cookies:", request.cookies)
  //console.log(request.session)
  //console.log(request.session)
});

app.post("/", (request: Middleware.CustomRequest, response: Response) => {
  response.cookie("qq", "Q_q")
})

app.post("/current-user", UserController.getCurrentUser)

app.post('/login', UserController.validateLogin)
app.post('/signup', UserController.signup)

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