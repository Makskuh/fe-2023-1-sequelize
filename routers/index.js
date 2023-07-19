const express = require('express');
const UserController = require('../controllers/userController');
const TaskController = require('../controllers/taskController');
const userRouter = express.Router();

// userRouter.use
// userRouter.post('/asdsfas')

userRouter
  .route('/users')
  .get(UserController.getUsers)
  .post(UserController.createUser);

userRouter
  .route('/users/:userId')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

userRouter.post('/users/:userId/tasks', TaskController.createTask);

userRouter.put('/users/v2/:userId', UserController.updateUserInstance);
userRouter.delete('/users/v2/:userId', UserController.deleteUserInstance);

module.exports = userRouter;
