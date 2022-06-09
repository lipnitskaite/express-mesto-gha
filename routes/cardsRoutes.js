const express = require('express');
const cardsRoutes = express.Router();
const { getCards, createCard, deleteCardByID } = require('../controllers/cardController');

// GET /cards — возвращает все карточки
cardsRoutes.get('/', getCards);

// POST /cards — создаёт карточку
// cardsRoutes.post('/', express.json(), createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
// cardsRoutes.get('/:cardId', deleteCardByID);


exports.cardsRoutes = cardsRoutes;