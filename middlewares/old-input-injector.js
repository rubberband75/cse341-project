module.exports = (req, res, next) => {
  res.locals.oldInput = { ...req.body };
  next();
};