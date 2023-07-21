const express = require('express');
const router = require('./routers');
const ErrorHandlers = require('./middlewares/errors');

const app = express();

const bodyParser = express.json();
app.use(bodyParser); // монтує міддлвери на будь-які методи (get, post ...)

app.use(express.static('public'));

app.use(router);

app.use(
  ErrorHandlers.sequelizeUniqueConflictHandler,
  ErrorHandlers.basicHandler
);

module.exports = app;
