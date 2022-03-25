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

usersRouter.options('*', cors());

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getUserMe);
usersRouter.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().alphanum().length(24),
  }),
}), getUser);
usersRouter.patch('/users/me', cors(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
usersRouter.patch('/users/me/avatar', cors(), celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlRegexpPattern),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
