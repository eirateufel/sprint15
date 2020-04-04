const usersRouter = require('express').Router();
const { getUsers, getUser } = require('../controllers/users');

usersRouter.get('/users/:id', getUser);

usersRouter.get('/users', getUsers);

usersRouter.get('/:nonexistent', (req, res) => {
	res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = usersRouter;
