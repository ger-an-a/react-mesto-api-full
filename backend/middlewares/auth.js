const jwt = require('jsonwebtoken');
const LoginError = require('../errors/LoginError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new LoginError();
  }
  req.user = payload;
  next();
};
