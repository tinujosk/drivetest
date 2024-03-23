const User = require('../models/User');

module.exports = async (req, res) => {
  const {
    firstName,
    lastName,
    licenceNumber,
    age,
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

  try {
    const user = await User.findByIdAndUpdate(
      req.session.userId,
      { $set: { firstName, lastName, licenceNumber, age, carDetails } },
      { new: true }
    );
    res.render('g2-test', { user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
