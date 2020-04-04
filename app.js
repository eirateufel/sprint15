const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { createUser, login } = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
})
	.then(() => console.log('Соединение с базой данных установлено'))
	.catch((err) => console.log(err.message));

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/', auth, cardsRouter);
app.use('/', auth, usersRouter);

app.listen(PORT, () => {
	// console.log('Im running');
});
