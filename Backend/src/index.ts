import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();
const mongoose: any = require('mongoose');
const port = process.env.PORT || 3001;

dotenv.config();

async function main() {
  const connection = await mongoose.connect(process.env.MONGODB_URL);
  console.log(`Successfully connected to MongoDB!\n${connection.connection.host}`);
}

main().catch(error => console.error(error));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});