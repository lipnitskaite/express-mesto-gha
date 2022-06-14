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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  // likes - список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default);
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
  // дата создания, тип Date, значение по умолчанию Date.now
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

exports.Card = mongoose.model('card', cardSchema);

