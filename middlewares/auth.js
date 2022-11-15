const jwt = require('jsonwebtoken');
const NotAuthorized = require('../errors/NotAuthorized');
const { errorMessages } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthorized(errorMessages.authMessage));
  }
  const token = String(req.headers.authorization).replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return next(new NotAuthorized(errorMessages.authMessage));
  }
  req.user = payload;
  return next();
};
