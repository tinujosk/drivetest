const User = require('../models/User');

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.session.userId,
    });
    res.render('g-test', { user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
