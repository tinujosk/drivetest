const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      // Compare the provided password with the hashed password
      if (await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        req.session.userType = user.userType;
        res.redirect('/');
      } else {
        res.render('login', { error: 'Invalid username or password' });
      }
    } else {
      res.render('login', { error: 'No such user' });
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
