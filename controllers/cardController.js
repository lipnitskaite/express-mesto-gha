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

exports.doesCardExist = async (req, res, next) => {
  if (req.params.cardId.match(/^[0-9a-fA-F]{24}$/)) {
    const cards = await Card.findById(req.params.cardId);

    if (!cards) {
      res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена.' });
      return;
    }
  } else {
    res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при поиске карточки.' });
  }

  next();
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
    if (err.name === 'Error') return res.status(ERROR_CODE).send({ message: 'Ошибка при снятии лайка.' });
  }
};

exports.deleteCardByID = async (req, res, next) => {
  try {
    const cards = await Card.findByIdAndDelete(req.params.cardId);

    res.send(cards);
  } catch (err) {
    if (err.name === 'Error') return res.status(ERROR_CODE).send({ message: 'Ошибка при удалении карточки.' });
  }
};