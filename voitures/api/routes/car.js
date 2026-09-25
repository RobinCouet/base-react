import express from 'express';
import CarController from '../controllers/car.controller.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/cars', CarController.getAll);
router.get('/cars/:id', CarController.getOneCar);
router.post("/cars", verifyToken, CarController.create);

export default router;