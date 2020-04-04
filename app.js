const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { createUser, login } = require('./controllers/users.js');
const { loginObj, createUserObj, authObj } = require('./celebrate_obj/celebrate-obj');
const auth = require('./middlewares/auth.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
})
	.then(() => console.log('Соединение с базой данных установлено'))
	.catch((err) => console.log(err.message)); //не знаю что делать с этой ошибкой,
// тут ведь никак не впилить next
app.use(bodyParser.json());

app.post('/signin', celebrate(loginObj), login);

app.post('/signup', celebrate(createUserObj), createUser);

app.use('/', celebrate(authObj), auth, cardsRouter);

app.use('/', celebrate(authObj), auth, usersRouter);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
      .status(statusCode)
      .send({
          message: statusCode === 500
              ? 'На сервере произошла ошибка'
              : message
      });
});

app.listen(PORT, () => {
	// console.log('Im running');
});
