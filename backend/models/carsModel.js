// Цю відповідь з сервера треба записати у БД:
// {
//     "title": "A6",
//     "manufacture": "Audi",
//     "Color": "Black",
//     "Price": "55000"
// }

// Для цього використовуємо mongoose. Беремо з нього модель і схему

const { Schema, model } = require('mongoose');

// // Схема:
// const carsSchema = new Schema({
//   title: String,
//   manufacture: String,
//   color: String,
//   price: Number,
// });

// Робимо схему з обов'язковими і необов'язковими полями для валідації на рівні контролера (це буде четверта валідація)
const carsSchema = new Schema({
  title: {
    type: String,
    required: [true, "поле 'title' обов'язкове"], // 4та валідація
  },
  manufacturer: {
    type: String,
    required: [true, "поле 'manufacture' обов'язкове"], // 4та валідація
  },
  color: {
    type: String,
    required: false, // це писати не обов'язково, бо за замовчуванням там false
    default: 'white',
  },
  price: {
    type: Number,
    required: false, // це писати не обов'язково, бо за замовчуванням там false
    default: 10000,
  },
});

// Експортуємо модель
// Назву моделі беремо у БД - вона буде така ж, як назва колекції, в яку ми будемо пушити відповідь з серверу.
// Другим параметром передаємо схему.
module.exports = model('cars', carsSchema); // cars - це назва моделі.
