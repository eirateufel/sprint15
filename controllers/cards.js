const Card = require('../models/card');

module.exports.getCards = (req, res) => {
	Card.find({})
		.then((cards) => res.send({ data: cards }))
		.catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
	const { name, link } = req.body;
	const owner = req.user._id;
	Card.create({ name, link, owner })
		.then((card) => res.send({ data: card }))
		.catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.removeCard = (req, res) => {
	Card.findByIdAndRemove(req.params.cardId)
		.then((user) => res.send({ data: user }))
		.catch((err) => res.status(500).send({ message: err.message }));
};
