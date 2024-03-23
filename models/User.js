const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  firstName: { type: String, default: 'default' },
  lastName: { type: String, default: 'default' },
  age: { type: Number, default: 0 },
  licenceNumber: { type: String, default: 'default' },
  carDetails: {
    carMake: { type: String, default: 'default' },
    carModel: { type: String, default: 'default' },
    carYear: { type: Number, default: 0 },
    plateNumber: { type: String, default: 'default' },
  },
});

UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
