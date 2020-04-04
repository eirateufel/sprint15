const cardsRouter = require('express').Router();
const { getCards, createCard, removeCard } = require('../controllers/cards');
const { doesCardExist, checkOwner } = require('../middlewares/cards');

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', createCard);

cardsRouter.delete('/cards/:cardId', doesCardExist, checkOwner, removeCard);

module.exports = cardsRouter;
