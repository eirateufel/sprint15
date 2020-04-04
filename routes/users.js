const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const { getUsers, getUser } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');

usersRouter.get('/users/:id', celebrate({
  body: Joi.object().keys({
      id: Joi.string().required().min(1),
  }),
}), getUser);

usersRouter.get('/users', getUsers);

usersRouter.get('/:nonexistent', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = usersRouter;
