const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
    });
  }
  return null;
};

module.exports = handleValidationErrors;
