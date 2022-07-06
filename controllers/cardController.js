const { Card } = require('../models/cardModel');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    next(err);
  }
};

exports.doesCardExist = async (req, res, next) => {
  try {
    if (req.params.cardId.match(/^[0-9a-fA-F]{24}$/)) {
      const cards = await Card.findById(req.params.cardId);

      if (!cards) {
        throw new NotFoundError('Запрашиваемая карточка не найдена.');
      }
    } else {
      throw new ValidationError('Указан некорректный id карточки.');
    }
  } catch(err) {
    next(err);
  }

  next();
};

exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    if (name.length < 2 || name.length > 30) {
      throw new ValidationError('Имя карточки должно содержать от 2 до 30 символов');
    }

    const newCard = await Card.create({
      name,
      link,
      owner: req.user._id
    });

    res.send(newCard);
  } catch (err) {
    next(err);
  }
};

exports.likeCard = async (req, res, next) => {
  try {
    await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id} },
      { new: true },
    );

    res.send({message: "Лайк поставлен"});
  } catch (err) {
    next(err);
  }
};

exports.dislikeCard = async (req, res, next) => {
  try {
    await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id} },
      { new: true },
    );

    res.send({message: "Лайк убран"});
  } catch(err) {
    next(err);
  }
};

exports.deleteCardByID = async (req, res, next) => {
  try {
    const cards = await Card.findByIdAndDelete(req.params.cardId);

    res.send(cards);
  } catch(err)  {
    next(err);
  }
};