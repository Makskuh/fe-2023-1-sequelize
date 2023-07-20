const express = require('express');
const rootRouter = express.Router();
const userRouter = require('./userRouter');

rootRouter.use('/users', userRouter);

module.exports = rootRouter;
