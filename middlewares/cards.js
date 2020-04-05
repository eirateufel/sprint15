const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const PermReqError = require('../errors/perm-required-err');

module.exports.doesCardExist = (req, res, next) => {
	console.log('DOES EXIST');
	Card.findById(req.params.cardId)
		.then((card) => {
			console.log('ITS HERE');
			console.log(card);
			if (!card) {
				throw new NotFoundError('Карточка, которую вы пытаетесь удалить, не найдена');
			} else {
				next();
			}
		})
		.catch((err) => {
			console.log('NOT HERE');
			next(err);
		});
};

module.exports.checkOwner = (req, res, next) => {
	console.log('IS OWNER');
	Card.findById(req.params.cardId)
		.then((card) => {
			console.log(req.user._id.toString());
			if (card.owner.toString() !== req.user._id.toString()) {
				throw new PermReqError('Недостаточно прав');
			} else {
				return true;
			}
		})
		.catch((err) => {
			next(err);
		});
};
