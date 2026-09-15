import db from '../config/db.js';

import Car from './Car.js';

db.sync();

export {
    Car
}