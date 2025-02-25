import express from "express";
import multer from "multer"; // Importa Multer
import {
    getSeller,
    getSellerById,
    createSeller,
    deleteSeller,
    updateSeller,
    uploadSellerImage,
    loginSeller
} from "../controllers/sellerController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

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

const router = express.Router();

// Route che non ciede autenticazione
router.post('/', upload.single('image'), createSeller);
router.post('/login', loginSeller);
router.get('/', getSeller);
router.get('/:id', getSellerById);
router.put('/:id', upload.single('image'), updateSeller);

// Route che richiedono autenticazione
router.post('/:id/image', authMiddleware, upload.single('image'), uploadSellerImage);
router.delete('/:id', authMiddleware, deleteSeller);


export { router }; 