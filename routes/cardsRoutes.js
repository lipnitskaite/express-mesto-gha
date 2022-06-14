const express = require('express');
const cardsRoutes = express.Router();
const { getCards, createCard, likeCard, deleteCardByID } = require('../controllers/cardController');

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', express.json(), createCard);
cardsRoutes.put('/:cardId/likes', likeCard);
cardsRoutes.delete('/:cardId', deleteCardByID);

exports.cardsRoutes = cardsRoutes;