const express = require('express');
const router = require('./routers');

const app = express();

const bodyParser = express.json();
app.use(bodyParser); // монтує міддлвери на будь-які методи (get, post ...)

app.use(router);

app.use(async (err, req, res, next) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(409).send({ errors: err.errors });
  } else {
    res.status(500).send('Error happened');
  }
});

module.exports = app;
