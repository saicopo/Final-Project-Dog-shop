import express from "express";
import cors from "cors";
import connectDB from "./config/databse.js";
import multer from "multer";
import path from "path";
import 'dotenv/config';
//route
import { router as dogsRouter } from "./routes/dogRoutes.js";
import { router as sellerRouter } from "./routes/sellerRoutes.js";

const server = express();
server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
connectDB();

//porta server
const port = 3001;

//configurazione Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
server.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

server.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Nessun file caricato.");
  }

  console.log("File caricato:", req.file);
  res.send("File caricato con successo!");
});

//endpoint
server.get("/", (req, res) => {
  res.send("Backend in funzione");
});

server.use("/api/dogs", dogsRouter);
server.use("/api/sellers", sellerRouter);

server.listen(port, () => {
  console.log(`Server in funzione sulla porta ${port}`);
});
