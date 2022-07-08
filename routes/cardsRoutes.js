const express = require('express');
const cardsRoutes = express.Router();
const { createCardValidation } = require('../middlewares/validation');
const { getCards, doesCardExist, createCard, likeCard, dislikeCard, deleteCardByID } = require('../controllers/cardController');

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', createCardValidation, createCard);

cardsRoutes.put('/:cardId/likes', doesCardExist);
cardsRoutes.put('/:cardId/likes', likeCard);

cardsRoutes.delete('/:cardId/likes', doesCardExist);
cardsRoutes.delete('/:cardId/likes', dislikeCard);

cardsRoutes.delete('/:cardId', doesCardExist);
cardsRoutes.delete('/:cardId', deleteCardByID);

exports.cardsRoutes = cardsRoutes;