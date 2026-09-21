import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import carRoutes from './routes/car.js';
import userRoutes from './routes/user.js';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(carRoutes);
app.use(userRoutes);

app.listen(3000, () => {
    console.log("API démarée sur http://localhost:3000");
})