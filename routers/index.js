const express = require('express');
const rootRouter = express.Router();
const userRouter = require('./userRouter');
const groupRouter = require('./groupRouter');

rootRouter.use('/users', userRouter);
rootRouter.use('/groups', groupRouter);

module.exports = rootRouter;
