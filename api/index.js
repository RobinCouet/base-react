import express from 'express';
import carRoutes from './routes/car.js';

const app = express();

app.use(carRoutes);

app.listen(3000, () => {
    console.log("API démarée sur http://localhost:3000");
})