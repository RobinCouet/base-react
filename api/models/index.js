import db from '../config/db.js';

import Car from './Car.js';
import User from "./User.js";

db.sync();

export {
    Car,
    User
}