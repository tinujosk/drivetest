const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  licenceNumber: String,
  age: Number,
  dob: Date,
  carDetails: {
    carMake: String,
    carModel: String,
    carYear: Number,
    plateNumber: String,
  },
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
