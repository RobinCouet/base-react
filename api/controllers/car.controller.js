class CarController {
    // Toujours 2 params :
    // req: Request, contenu des données arrivant au controller
    // res: Response, ce qu'on renvois a la personne qui fait l'appel
    getAll = async (req, res) => {
        const cars = [
            {
                brand: "Toyota",
                model: "Aygo"
            },
            {
                brand: "Honda",
                model: "Civic"
            }
        ];

        res.json(cars);
    }

    getOneCar = async (req, res) => {
        res.json({
            brand: "Renault",
            model: "12"
        });
    }
}

export default new CarController;