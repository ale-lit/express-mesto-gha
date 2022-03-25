const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const cors = require('cors');
const {
  getUsers,
  getUserMe,
  getUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');
const urlRegexpPattern = require('../regexp');

const corseOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

usersRouter.options('*', cors(corseOptions));

usersRouter.get('/users', cors(corseOptions), getUsers);

usersRouter.get('/users/me', cors(corseOptions), getUserMe);

usersRouter.get('/users/:id', cors(corseOptions), celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().alphanum().length(24),
  }),
}), getUser);

// usersRouter.options('/users/me', cors(corseOptions));
usersRouter.patch('/users/me', cors(corseOptions), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

usersRouter.options('/users/me/avatar', cors(corseOptions));
usersRouter.patch('/users/me/avatar', cors(corseOptions), celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlRegexpPattern),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
