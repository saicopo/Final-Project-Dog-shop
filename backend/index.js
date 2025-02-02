import express from "express";
import cors from "cors";
import connectDB from "./config/databse.js";
import {router as dogsRouter} from './routes/dogRoutes.js'
// import { router as userRouter } from "./routes/routes.js";

const server = express();

server.use(express.json());
server.use(cors());
connectDB();

const port = 3001;

server.get("/", (req, res) => {
  res.send("Backend in funzione");
});

server.use("/api/dogs", dogsRouter);
// server.use("/api/dogs", dogsRouter);


server.listen(port, () => {
  console.log(`Server in funzione sulla porta ${port}`);
});