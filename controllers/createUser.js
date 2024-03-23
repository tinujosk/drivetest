const User = require('../models/User');

module.exports = async (req, res) => {
  const {
    username,
    password,
    userType,
    firstName,
    lastName,
    age,
    licenceNumber,
    carMake,
    carModel,
    carYear,
    plateNumber,
  } = req.body;

  const carDetails = {
    carMake,
    carModel,
    carYear,
    plateNumber,
  };

  const newUser = new User({
    username,
    password,
    userType,
    firstName,
    lastName,
    age,
    licenceNumber,
    carDetails,
  });

  try {
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      res.render('signup', { error: 'Username already exists' });
    }
  }
};
