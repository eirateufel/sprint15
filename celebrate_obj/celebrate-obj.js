const { Joi } = require('celebrate');

const loginObj = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		password: Joi.string().required().min(4).max(30),
	}),
};

const createUserObj = {
	body: Joi.object().keys({
		name: Joi.string().required().min(2).max(30),
		about: Joi.string().required().min(2).max(30),
		avatar: Joi.string().required().uri(),
		email: Joi.string().required().email(),
		password: Joi.string().required().min(4).max(30),
	}),
};

const getUserObj = {
	body: Joi.object().keys({
		id: Joi.string().required().min(1),
	}),
};

const authObj = {
	headers: Joi.object().keys({
		authorization: Joi.string().required().min(8),
	}).unknown(true),
};

module.exports = {
	loginObj, createUserObj, getUserObj, authObj,
};
