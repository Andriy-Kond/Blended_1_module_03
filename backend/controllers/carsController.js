// Замість try...catch
const asyncHandler = require('express-async-handler');

// // Для валідації:
// const { isValidObjectId } = require('mongoose');

// Рефакторінг - винесли валідацію id в окрему ф-ю
const validateID = require('../utils/validateID');

// затягуємо сюди модель
const carsModel = require('../models/carsModel');

class carsController {
  // // Це поганий приклад коду, бо try...catch ми юзаємо в кожному методі (контролері), і помилку кидаємо так само в кожному
  // // Тому нам треба зробити обробник помилок і юзати скрізь його, а не повторювати код.
  // async addCar(req, res) {
  //   // res.send('addCar');
  //   // res.send(req.body);

  //   // Третя валідація: перевіряємо чи прийшло до нас обов'язкове поле.
  //   try {
  //     const { manufacturer, title } = req.body;

  //     // якщо немає обов'язкових полів, то ми не робимо запит у бд
  //     // Третя валідація:
  //     if (!manufacturer || !title) {
  //       // throw new Error();
  //       res
  //         .status(400)
  //         .json({ code: 400, message: 'Provide all required fields' });
  //     }

  //     const car = await carsModel.create({ ...req.body });

  //     res.status(201).json({ code: 201, message: 'Success' });
  //   } catch (error) {
  //     res.send(error.message);
  //   }
  // }

  // Рефакторінг
  // Замість try...catch використовуємо бібліотеку express-async-handler
  addCar = asyncHandler(async (req, res) => {
    const { manufacturer, title } = req.body;
    if (!manufacturer || !title) {
      res.status(400);
      throw new Error('Provide all required fields');
    }

    // // Запит у БД
    const car = await carsModel.create({ ...req.body });
    res.status(201).json({ code: 201, message: 'Success', data: car });

    res.send(error.message);
  });

  // async getAllCars(req, res) {
  //   res.send('getAllCars');
  // }

  // По аналогії робимо для getAllCars
  getAllCars = asyncHandler(async (req, res) => {
    const result = await carsModel.find({});

    res.status(200).json({
      code: 200,
      message: 'Success',
      data: result,
      qty: result.length,
    });
  });

  getOneCar = asyncHandler(async (req, res) => {
    const { carID } = req.params;

    // Валідація з трьох пунктів:
    // 1. ID не валідний. Тобто не відповідає розміру і формату
    // 2. ID не знайдений у базі (тіло не передано)
    // Ці перевірки треба робити і при оновленні і при видаленні. Тобто можна винести в окрему ф-ю validateID

    // if (!isValidObjectId(carID)) {
    //   res.status(400);
    //   throw new Error('Not valid ID');
    // }

    // Рефакторінг - винесли валідацію id в окрему ф-ю
    if (!validateID(carID)) {
      res.status(400);
      throw new Error('Not valid ID');
    }

    const oneCar = await carsModel.findById(carID);

    if (!oneCar) {
      res.status(400);
      throw new Error('ID not found');
    }

    res.status(200).json({
      code: 200,
      message: 'Success',
      data: oneCar,
    });
  });

  updateCar = asyncHandler(async (req, res) => {
    const { carID, title, manufacturer } = req.params;

    const updatedCar = await carsModel.findByIdAndUpdate(
      carID,
      { ...req.body },
      { new: true }
    );

    res.status(201).json({
      code: 201,
      message: 'Success',
      data: updatedCar,
    });
  });

  removeCar = asyncHandler(async (req, res) => {
    const { carID } = req.params;
    // const removeCar = await carsModel.findByIdAndDelete(carID);
    const removeCar = await carsModel.findById(carID);
    // Тепер removeCar - це екземпляр об'єкту (instance)
    await removeCar.deleteOne();

    res.status(201).json({
      code: 201,
      message: 'Success',
      data: removeCar,
    });
  });
}

module.exports = new carsController();
