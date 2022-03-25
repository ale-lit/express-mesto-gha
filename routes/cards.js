const { celebrate, Joi } = require('celebrate');
const cardsRouter = require('express').Router();
const cors = require('cors');
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const urlRegexpPattern = require('../regexp');

// cardsRouter.options('*', cors());

cardsRouter.get('/cards', getCards);

// cardsRouter.options('/cards/:id', cors());
cardsRouter.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().alphanum().length(24),
  }),
}), deleteCard);

cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegexpPattern),
  }),
}), createCard);

// cardsRouter.options('/cards/:id/likes', cors());
cardsRouter.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().alphanum().length(24),
  }),
}), likeCard);

// cardsRouter.options('/cards/:id/likes', cors());
cardsRouter.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = cardsRouter;
