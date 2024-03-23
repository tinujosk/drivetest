const User = require('../models/User');

// The search feature from the G-Page has been removed. But keeping it.
module.exports = async (req, res) => {
  try {
    const user = await User.findOne({
      licenceNumber: req.query.licenceNumber,
    });
    res.render('g-test', { user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
