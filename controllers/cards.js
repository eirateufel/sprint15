const Card = require('../models/card');
const InvalidDataErr = require('../errors/invalid-data-err');

module.exports.getCards = (req, res, next) => {
	Card.find({})
		.then((cards) => res.send({ data: cards }))
		.catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
	const { name, link } = req.body;
	const owner = req.user._id;
	Card.create({ name, link, owner })
		.then((card) => res.send({ data: card }))
		.catch(() => next(new InvalidDataErr('Проверьте корректность данных')));
};

module.exports.removeCard = (req, res, next) => {
	Card.findByIdAndRemove(req.params.cardId)
		.then((user) => res.send({ data: user }))
		.catch((err) => next(err));
};
