const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина - 2 символа'],
    maxlength: [30, 'Максимальная длина - 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина - 2 символа'],
    maxlength: [30, 'Максимальная длина - 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    minlength: [2, 'Минимальная длина - 2 символа'],
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина - 2 символа'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});

exports.User = mongoose.model('user', userSchema);

