const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const PermReqError = require('../errors/perm-required-err');

module.exports.doesCardExist = (req, res, next) => {
	Card.findById(req.params.cardId)
		.then(() => {
			next();
		})
		.catch(() => {
			next(new NotFoundError('Карточка, которую вы пытаетесь удалить, не найдена'));
		});
};

module.exports.checkOwner = (req, res, next) => {
	Card.findById(req.params.cardId)
		.then((card) => {
			if (card.owner.toString() !== req.user._id.toString()) {
				throw new PermReqError('Недостаточно прав');
			} else {
				next();
			}
		})
		.catch((err) => {
			next(err);
		});
};
