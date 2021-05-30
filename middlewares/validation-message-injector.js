const { validationResult } = require("express-validator/check");

module.exports = (req, res, next) => {
  try {
    const validations = validationResult(req);
    const errorsArray = validations.array();
    const validationErrors = errorsArray.reduce((accumulator, currentError) => {
      accumulator[currentError.param] = currentError.msg;
      return accumulator;
    }, {});

    res.locals.hasValidationErrors = !validations.isEmpty();
    res.locals.validationErrors = validationErrors;
  } catch (error) {
    console.error(error);
    res.locals.validationErrors = {};
  } finally {
    next();
  }
};
