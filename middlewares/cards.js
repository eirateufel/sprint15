const Card = require('../models/card');

module.exports.doesCardExist = (req, res, next) => {
	Card.findById(req.params.cardId)
		.then((card) => {
			if (card) { next(); } else { res.status(404).send({ message: 'Карточка, которую вы пытаетесь удалить, не найдена' }); }
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

module.exports.checkOwner = (req, res, next) => {
	Card.findById(req.params.cardId)
		.then((card) => {
			if (card.owner.toString() === req.user._id.toString()) { next(); } else { res.status(403).send({ message: 'Недостаточно прав' }); }
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
