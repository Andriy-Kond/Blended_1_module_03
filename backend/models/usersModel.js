const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
  name: {
    type: String,
    default: 'unknown name',
  },
  email: {
    type: String,
    required: [true, "поле 'email' обов'язкове"],
  },
  password: {
    type: String,
    required: [true, "поле 'password' обов'язкове"],
    default: 'white',
  },
});

module.exports = model('users', usersSchema);
