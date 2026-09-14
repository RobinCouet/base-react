import express from 'express';
import CarController from '../controllers/car.controller.js';

const router = express.Router();

router.get('/cars', CarController.getAll);
router.get('/cars/single', CarController.getOneCar);

export default router;