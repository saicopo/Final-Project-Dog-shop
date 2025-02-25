import express from "express";
import {
  getAllDogs,
  getDogsById,
  createDog,
  deleteDog,
  updateDog,
  uploadDogImage
} from "../controllers/dogController.js";
import multer from "multer";

const router = express.Router();

// Configurazione Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get("/", getAllDogs);
router.get("/:id", getDogsById);
router.post("/",upload.single('image'), createDog);
router.delete("/:id", deleteDog);
router.put("/:id",upload.single('image'), updateDog);

export { router };
