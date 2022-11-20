const { ERROR_CODE404, ERROR_MESSAGE404 } = require('../utils/constants');

class NotFoundError extends Error {
  constructor() {
    super(ERROR_MESSAGE404);
    this.statusCode = ERROR_CODE404;
  }
}

module.exports = NotFoundError;
