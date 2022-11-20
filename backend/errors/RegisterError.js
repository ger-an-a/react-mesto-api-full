const { ERROR_CODE409, ERROR_MESSAGE409 } = require('../utils/constants');

class RegisterError extends Error {
  constructor() {
    super(ERROR_MESSAGE409);
    this.statusCode = ERROR_CODE409;
  }
}

module.exports = RegisterError;
