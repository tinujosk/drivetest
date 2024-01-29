const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('dashboard');
});

app.get('/g-test', (req, res) => {
  res.render('g-test');
});

app.get('/g2-test', (req, res) => {
  res.render('g2-test');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/*', (req, res) => {
  res.render('dashboard');
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
