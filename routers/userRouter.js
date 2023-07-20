const express = require('express');
const taskRouter = require('./taskRouter');
const UserController = require('../controllers/userController');
const { checkUserExistanceMW } = require('../middlewares/users.mv');
const userRouter = express.Router();

userRouter
  .route('/')
  .get(UserController.getUsers)
  .post(UserController.createUser);

userRouter
  .route('/:userId')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

userRouter.put('/v2/:userId', UserController.updateUserInstance);
userRouter.delete('/v2/:userId', UserController.deleteUserInstance);

userRouter.use('/:userId/tasks', checkUserExistanceMW, taskRouter);

module.exports = userRouter;
