const express = require('express');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const ejs = require('ejs');
const renderDashboardController = require('./controllers/renderDashboard');
const renderGTestController = require('./controllers/renderGTest');
const renderG2TestController = require('./controllers/renderG2Test');
const renderLoginController = require('./controllers/renderLogin');
const renderSignupController = require('./controllers/renderSignup');
const createUserController = require('./controllers/createUser');
const updateUserController = require('./controllers/updateUser');
const searchUserController = require('./controllers/searchUser');
const loginUserController = require('./controllers/loginUser');
const logoutUserController = require('./controllers/logoutUser');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthMiddleware = require('./middleware/redirectIfAuthMiddleware');
const driverCheckMiddleware = require('./middleware/driverCheckMiddleware');

const mongoPassword = 'mongoCluster0';
const databaseName = 'drivetest';
global.loggedIn = null;
global.userType = null;

mongoose.connect(
  `mongodb+srv://tkadavanattu7158:${mongoPassword}@cluster0.tc6hl1k.mongodb.net/${databaseName}`,
  { useNewUrlParser: true }
);

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(
  expressSession({
    secret: 'session-secret',
  })
);
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  userType = req.session.userType;
  next();
});

app.get('/', authMiddleware, renderDashboardController);

app.get(
  '/g-test',
  authMiddleware,
  driverCheckMiddleware,
  renderGTestController
);

app.get(
  '/g2-test',
  authMiddleware,
  driverCheckMiddleware,
  renderG2TestController
);

app.get('/login', redirectIfAuthMiddleware, renderLoginController);

app.get('/signup', redirectIfAuthMiddleware, renderSignupController);

app.get('/users/search', searchUserController);

app.post('/users/login', loginUserController);

app.post('/users/create', createUserController);

app.post('/users/update', updateUserController);

app.get('/logout', logoutUserController);

app.use((req, res) => res.render('notfound'));

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
