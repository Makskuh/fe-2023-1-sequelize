const express = require('express');
const path = require('path');
const router = require('./routers');
const ErrorHandlers = require('./middlewares/errors');
const CONSTANTS = require('./constants');

const app = express();

const bodyParser = express.json();
app.use(bodyParser); // монтує міддлвери на будь-які методи (get, post ...)

app.use(express.static(CONSTANTS.FILES_PATH));

app.use(router);

app.use(
  ErrorHandlers.sequelizeUniqueConflictHandler,
  ErrorHandlers.basicHandler
);

module.exports = app;
