const { Card } = require('../models/cardModel');

// const ValidationError = require('../errors/ValidationError');
// const NotFoundError = require('../errors/NotFoundError');

const VALIDATION_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const ERROR_CODE = 500;

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    if (err.name === 'NotFoundError') return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемые карточки не найдены.' });
    if (err.name === 'Error') return res.status(ERROR_CODE).send({ message: 'Ошибка при отображении карточек.' });
  }
};

exports.createCard = async (req, res, next) => {
  try {
    const newCard = await Card.create({...req.body, owner: req.user._id});

    res.send(newCard);
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки.' });
    if (err.name === 'Error') return res.status(ERROR_CODE).send({ message: 'Ошибка при создании карточки.' });
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
    if (err.name === 'ValidationError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при постановке лайка.' });
    if (err.name === 'NotFoundError') return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена.' });
    if (err.name === 'Error') return res.status(ERROR_CODE).send({ message: 'Ошибка при постановке лайка.' });
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
    if (err.name === 'ValidationError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при снятии лайка.' });
    if (err.name === 'NotFoundError') return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена.' });
    if (err.name === 'Error') return res.status(ERROR_CODE).send({ message: 'Ошибка при снятии лайка.' });
  }
};

exports.deleteCardByID = async (req, res) => {
  try {
    const cards = await Card.findByIdAndDelete(req.params.cardId);

    res.send(cards);
  } catch (err) {
    if (err.name === 'NotFoundError') return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена.' });
    if (err.name === 'Error') return res.status(ERROR_CODE).send({ message: 'Ошибка при удалении карточки.' });
  }
};