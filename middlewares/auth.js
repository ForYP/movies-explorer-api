const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/Unauthorized');
const { AUTHORIZATION_REQUIRED } = require('../utils/constant');

const {
  NODE_ENV = 'development',
  JWT_SECRET = 'development',
} = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(AUTHORIZATION_REQUIRED));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError(AUTHORIZATION_REQUIRED));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
