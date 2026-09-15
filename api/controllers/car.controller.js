import { Car } from '../models/index.js';
class CarController {
    // Toujours 2 params :
    // req: Request, contenu des données arrivant au controller
    // res: Response, ce qu'on renvois a la personne qui fait l'appel
    getAll = async (req, res) => {
        const cars = await Car.findAll();

        res.json(cars);
    }

    getOneCar = async (req, res) => {
        // const id = req.params.id;
        const { id } = req.params;

        const car = await Car.findByPk(id);

        if (!car) {
            return res.status(404).json({ message: "Voiture introuvable" });
        }

        res.json(car);
    }
}

export default new CarController;