import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Car = db.define("Car", {
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Car;