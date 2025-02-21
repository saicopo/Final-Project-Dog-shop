import express from "express";
import {
  getAllDogs,
  getDogsById,
  createDog,
  deleteDog,
  updateDog,
} from "../controllers/dogController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllDogs);
router.get("/:id", getDogsById);
router.post("/",authMiddleware, createDog);
router.delete("/:id", deleteDog);
router.put("/:id", updateDog);

export { router };
