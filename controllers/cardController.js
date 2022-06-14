const { Card } = require('../models/cardModel');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка при поиске всех карточек: ${err}` });
  }
};

// module.exports.addOwnerToCard = (req, res) => {

// };

exports.createCard = async (req, res, next) => {
  try {
    const newCard = await Card.create({...req.body, owner: req.user._id});

    res.send(newCard);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка при создании карточки: ${err}` });
  }
};

exports.deleteCardByID = async (req, res) => {
  try {
    const cards = await Card.findByIdAndRemove(req.params.cardId);

    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка при удалении карточки: ${err}` });
  }
};