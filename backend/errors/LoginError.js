const { ERROR_CODE401, ERROR_MESSAGE401 } = require('../utils/constants');

class LoginError extends Error {
  constructor() {
    super(ERROR_MESSAGE401);
    this.statusCode = ERROR_CODE401;
  }
}

module.exports = LoginError;
