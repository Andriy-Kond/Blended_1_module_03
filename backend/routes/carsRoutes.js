// Cannot GET /api/v1/cars

const carsController = require('../controllers/carsController');

const carsRoutes = require('express').Router();
// console.log('carsRoutes:', carsRoutes); // перевірка чи підключено

// Add a car
// Тут йде валідація Joi (2га валідація)
carsRoutes.post(
  '/cars',
  (req, res, next) => {
    console.log('Тут працює схема Joi-валідації');
    next();
  },
  carsController.addCar
);

// Get all cars
carsRoutes.get('/cars', carsController.getAllCars);

// Get single car
carsRoutes.get('/cars/:carID', carsController.getOneCar);

// Update car
carsRoutes.put('/cars/:carID', carsController.updateCar);
// carsRoutes.patch('/cars/:carID', carsController.updateCar);

// Delete car
carsRoutes.delete('/cars/:carID', carsController.removeCar);

module.exports = carsRoutes;
