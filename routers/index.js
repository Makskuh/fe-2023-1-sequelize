const express = require('express');
const rootRouter = express.Router();
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');

rootRouter.use(userRouter);
rootRouter.use(taskRouter);

module.exports = rootRouter;
