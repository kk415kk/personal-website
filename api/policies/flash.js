module.exports = function(req, res, next) {
  res.locals.messages = {};

  if(!req.session.messages) return next();
  res.locals.messages = _.clone(req.session.messages);

  // Clear flash
  req.session.messages = {};
  next();
};