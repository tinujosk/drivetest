module.exports = async (req, res, next) => {
  if (req.session.userType !== 'driver') return res.redirect('/');
  next();
};
