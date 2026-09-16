import express from 'express';
import CarController from '../controllers/car.controller.js';

const router = express.Router();

router.get('/cars', CarController.getAll);
router.get('/cars/:id', CarController.getOneCar);
router.post("/cars", CarController.create);

export default router;