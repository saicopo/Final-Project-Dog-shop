import jwt from "jsonwebtoken";
import 'dotenv/config';
export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(process.env.JWT_SECRET)
    if (!token) {
        return res.status(401).json({ message: 'Accesso non autorizzato' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Accesso non autorizzato' });
    }
}