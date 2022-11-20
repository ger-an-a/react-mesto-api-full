const { ERROR_CODE400, ERROR_MESSAGE400 } = require('../utils/constants');

class BadRequestError extends Error {
  constructor() {
    super(ERROR_MESSAGE400);
    this.statusCode = ERROR_CODE400;
  }
}

module.exports = BadRequestError;
