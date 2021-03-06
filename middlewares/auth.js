const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const Promise = require('promise');
const AuthReqError = require('../errors/auth-required-err');

function getAuth(req) {
	const { authorization } = req.headers;
	if (!authorization || !authorization.startsWith('Bearer ')) {
		throw new AuthReqError('Для выполнения действия необходима авторизация');
	}
	return new Promise(((resolve) => {
		resolve(authorization);
	}));
}

function makeToken(req, authorization) {
	const token = authorization.replace('Bearer ', '');
	let payload;

	try {
		payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
	} catch (err) {
		throw new AuthReqError('Для выполнения действия необходима авторизация');
	}

	req.user = payload;
}

module.exports = (req, res, next) => getAuth(req)
	.then((authorization) => {
		makeToken(req, authorization);
		return next();
	})
	.catch(next);
