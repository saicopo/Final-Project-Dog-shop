import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
    const token = req.headers('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Accesso non autorizzato' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Accesso non autorizzato' });
    }
}