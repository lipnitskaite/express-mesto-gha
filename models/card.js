const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  // owner - ссылка на модель автора карточки, тип ObjectId, обязательное поле
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  // likes - список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default);
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
  createdAt: Date, // дата создания, тип Date, значение по умолчанию Date.now
});

module.exports = mongoose.model('card', cardSchema);

