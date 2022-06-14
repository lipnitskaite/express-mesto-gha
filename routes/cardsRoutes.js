const express = require('express');
const cardsRoutes = express.Router();
const { getCards, createCard, deleteCardByID } = require('../controllers/cardController');

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', express.json(), createCard);
cardsRoutes.delete('/:cardId', deleteCardByID);

exports.cardsRoutes = cardsRoutes;