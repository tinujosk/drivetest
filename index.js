const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const User = require('./models/User');

const mongoPassword = 'mongoCluster0';
const databaseName = 'drivetest';

mongoose.connect(
  `mongodb+srv://tkadavanattu7158:${mongoPassword}@cluster0.tc6hl1k.mongodb.net/${databaseName}`,
  { useNewUrlParser: true }
);

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.render('dashboard');
});

app.get('/g-test', (req, res) => {
  res.render('g-test', { user: undefined });
});

app.get('/g2-test', (req, res) => {
  res.render('g2-test');
});

app.get('/login', (req, res) => {
  res.render('login');
});

// app.get('/*', (req, res) => {
//   res.render('dashboard');
// });

app.post('/users/create', async (req, res) => {
  const {
    firstName,
    lastName,
    licenceNumber,
    age,
    dob,
    carMake,
    carModel,
    carYear,
    plateNumber,
  } = req.body;

  // Construct the carDetails object
  const carDetails = {
    carMake,
    carModel,
    carYear,
    plateNumber,
  };

  // Create a new user instance
  const newUser = new User({
    firstName,
    lastName,
    licenceNumber,
    age,
    dob,
    carDetails,
  });

  await newUser.save();
  res.redirect('/');
});

app.post('/users/update', async (req, res) => {
  const { id, carMake, carModel, carYear, plateNumber } = req.body;
  console.log('ok bosy', req.body);
  const carDetails = {
    carMake,
    carModel,
    carYear,
    plateNumber,
  };

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { carDetails } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.render('g-test', { user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/users/search', async (req, res) => {
  try {
    const user = await User.findOne({
      licenceNumber: req.query.licenceNumber,
    });
    console.log('user', user);
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }
    res.render('g-test', { user });
    // res.render('g-test');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
