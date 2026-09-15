import express from 'express';
import CarController from '../controllers/car.controller.js';

const router = express.Router();

router.get('/cars', CarController.getAll);
router.get('/cars/:id', CarController.getOneCar);

export default router;