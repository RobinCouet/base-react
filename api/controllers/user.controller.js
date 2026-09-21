import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    register = async (req, res) => {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        res.json(user);
    }

    login = async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Aucun utilisateur ne correspond à ces identifiants" });
        }

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(404).json({ message: "Aucun utilisateur ne correspond à ces identifiants" });
        }

        const token = jwt.sign({
            userId: user.id
        }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true
        }).json(user);
    }
}

export default new UserController;