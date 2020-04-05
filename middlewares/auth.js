const jwt = require('jsonwebtoken');
const AuthReqError = require('../errors/auth-required-err');

function getAuth(req) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthReqError('Для выполнения действия необходима авторизация');
	}

  return  authorization;
}

function makeToken(authorization) {
  const token = authorization.replace('Bearer ', '');
	let payload;

	try {
		payload = jwt.verify(token, 'some-secret-key');
	} catch (err) {
      throw new AuthReqError('Для выполнения действия необходима авторизация');
	}

	req.user = payload;
}

module.exports = (req, res, next) => getAuth(req)
.then((authorization) => {
  makeToken(authorization);
	return next();
})
.catch(next);
