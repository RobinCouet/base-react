import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const verifyToken = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(403).json({ message: "Vous n'êtes pas connecté(e)" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId, {
            attributes: { exclude: ['password'] }
        })

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        next();

    } catch (error) {

    }
}

export { verifyToken };