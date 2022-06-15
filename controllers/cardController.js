const { Card } = require('../models/cardModel');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    if (err.name === 'NotFoundError') return res.status(NotFoundError.statusCode).send({ message: 'Запрашиваемые карточки не найдены' })
    if (err.name === 'Error') return res.status(500).send({ message: 'Ошибка при отображении карточек' })
  }
};

exports.createCard = async (req, res, next) => {
  try {
    const newCard = await Card.create({...req.body, owner: req.user._id});

    res.send(newCard);
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(ValidationError.statusCode).send({ message: 'Переданы некорректные данные при создании карточки' })
    if (err.name === 'Error') return res.status(500).send({ message: 'Ошибка при создании карточки' })
  }
};

exports.likeCard = async (req, res, next) => {
  try {
    await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id} },
      { new: true },
    );

    res.send('Лайк поставлен');
  } catch (err) {
    if (err.name === 'Error') return res.status(500).send({ message: 'Ошибка при лайке карточки' });
  }
};

exports.dislikeCard = async (req, res, next) => {
  try {
    await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id} },
      { new: true },
    );

    res.send('Лайк убран');
  } catch (err) {
    if (err.name === 'Error') return res.status(500).send({ message: 'Ошибка при снятии лайка с карточки' });
  }
};

exports.deleteCardByID = async (req, res) => {
  try {
    const cards = await Card.findByIdAndRemove(req.params.cardId);

    res.send(cards);
  } catch (err) {
    if (err.name === 'Error') return res.status(500).send({ message: 'Ошибка при удалении карточки' });
  }
};