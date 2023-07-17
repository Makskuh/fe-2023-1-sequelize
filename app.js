const express = require('express');
const router = require('./routers');

const app = express();

const bodyParser = express.json();
app.use(bodyParser); // монтує міддлвери на будь-які методи (get, post ...)

app.use(router);

module.exports = app;
