const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const {
  getUsers,
  getUserMe,
  getUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getUserMe);
usersRouter.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().alphanum().length(24),
  }),
}), getUser);
usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
usersRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().pattern(/^https?:\/\/(www.)?[\w\.\/\-~:\?#\[\]@!\$&'\(\)\*\+,;=]*/),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
