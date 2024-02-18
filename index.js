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

// Route to create new user details
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

  const carDetails = {
    carMake,
    carModel,
    carYear,
    plateNumber,
  };

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

// Update an existing user details using id
app.post('/users/update', async (req, res) => {
  const { id, carMake, carModel, carYear, plateNumber } = req.body;
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
    res.render('g-test', { user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search for an exisiting user
app.get('/users/search', async (req, res) => {
  try {
    const user = await User.findOne({
      licenceNumber: req.query.licenceNumber,
    });
    res.render('g-test', { user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
