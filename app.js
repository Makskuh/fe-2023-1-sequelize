const express = require('express');
const UserController = require('./controllers/userController');

const app = express();

const bodyParser = express.json();

// app.get('/users', UserController.getUsers);

// app.post(
//   '/users',
//   bodyParser,
//   (req, res, next) => {
//     req.test = 213545;
//     next();
//   },
//   UserController.createUser
// );

app
  .route('/users')
  .get(UserController.getUsers)
  .post(bodyParser, UserController.createUser);

app.delete('/users/:userId', UserController.deleteUser);

module.exports = app;
