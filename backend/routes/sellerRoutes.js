import express from "express";
import {
    getSeller,
    getSellerById,
    createSeller,
    deleteSeller,
    updateSeller,
} from "../controllers/sellerController.js";

const router = express.Router();

router.get("/", getSeller);
router.get("/:id", getSellerById);
router.post("/", createSeller);
router.delete("/:id", deleteSeller);
router.put("/:id", updateSeller);

export { router };