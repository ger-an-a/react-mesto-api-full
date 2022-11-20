const { ERROR_CODE403, ERROR_MESSAGE403 } = require('../utils/constants');

class AccessError extends Error {
  constructor() {
    super(ERROR_MESSAGE403);
    this.statusCode = ERROR_CODE403;
  }
}

module.exports = AccessError;
