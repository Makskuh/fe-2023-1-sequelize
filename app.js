const express = require('express');
const UserController = require('./controllers/userController');

const app = express();

const bodyParser = express.json();

app.get('/', (req, res) => {
  res.send('test');
});

app.post(
  '/users',
  bodyParser,
  (req, res, next) => {
    req.test = 213545;
    next();
  },
  UserController.createUser
);

module.exports = app;
