// Підключення бази даних
// Копіюємо код з головної сторінки https://mongoosejs.com/

// const mongoose = require('mongoose');
// щоби не затягувати весь mongoose, бо юзаємо лише один connect:
const { connect } = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test');

// З даними БД ми працювати не будемо, тому коментуємо ці рядки:
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

// ф-я підключенняд до БД
const connectDB = async () => {
  try {
    const db = await connect(process.env.MONGO_DB_HOST);
    console.log(
      `Database is connected. Name: ${db.connection.name}. Port: ${db.connection.port}. Host: ${db.connection.host}.`
        .blue.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.italic);
    process.exit(1);
  }
};

module.exports = connectDB;
