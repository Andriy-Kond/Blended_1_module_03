const { config } = require('dotenv');
const express = require('express');
require('colors');
const path = require('path');

// Затягуємо сюди middleware errorHandler.js
const errorHandler = require('./middlewares/errorHandler');

const connectDB = require('../config/connectDB'); // затягуємо ф-ю підключення до БД

const configPath = path.join(__dirname, '..', 'config', '.env');

require('dotenv').config({ path: configPath });
// console.log(require('dotenv').config({ path: configPath }));
//  {
//   parsed: {
//     PORT: '62000',
//     USER: 'Alesia',
//     ADMIN: 'Taya',
//     MONGO_DB_HOST: 'Igor'
//   }
// }
// тобто можна звертатись до змінних або через process.env.PORT, або через parsed.PORT. Але прийнято звертись до process.env

const app = express();

// * Читаємо передане через x-www-form-urlencoded
// у postman у body обираємо x-www-form-urlencoded
// Ключі прописуємо такі:
//     "title": "A6",
//     "manufacture": "Audi",
//     "Color": "Black",
//     "Price": "55000"
// Читаємо відправлене тіло:
app.use(express.urlencoded({ extended: false }));
// Отримуємо відповідь:
// {
//     "title": "A6",
//     "manufacture": "Audi",
//     "Color": "Black",
//     "Price": "55000"
// }

// * Читаємо JSON-файл:
// у postman у body обираю raw/JSON і відправляю об'єкт:
// {
//     "title": "A6",
//     "manufacture": "Audi",
//     "Color": "Black",
//     "Price": "55000"
// }
// Читаю JSON-об'єкт:
app.use(express.json());
// Отримую відповідь:
// {
//     "title": "A6",
//     "manufacture": "Audi",
//     "Color": "Black",
//     "Price": "55000"
// }

app.use('/api/v1', require('./routes/carsRoutes'));

// Затягуємо сюди middleware errorHandler.js
// Викликаємо як middleware
app.use(errorHandler);

const { PORT } = process.env;

connectDB(); // підключення до БД

app.listen(PORT, () =>
  console.log(`Server i running on port ${PORT}`.green.bold.italic)
);

// console.log('Hello world'.yellow.bold);

// Модель - об'єкт, що взаємодіє з БД ()
// Схема -

// Є 4 валідації:
// 1. Frontend - ми їй не довіряємо
// 2. Joi - в роутах. Перевіряє відповідність символам, знаки email, довжину, символи, паролі, типи даних і т.п.
// 3. Контролерна валідація (if...). Це основна валідація. Дивиться чи є поля і багато всього.
// 4. Валідація на рівні БД - в mongoose-моделі(схемі). До цієї валідації не має доходити. Якщо дійшло, значить погані попередні.
