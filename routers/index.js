const express = require('express');
const UserController = require('../controllers/userController');
const TaskController = require('../controllers/taskController');
const { checkUserExistanceMW } = require('../middlewares/users.mv');
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

userRouter.post(
  '/users/:userId/tasks',
  checkUserExistanceMW,
  TaskController.createTask
);
userRouter.get(
  '/users/:userId/tasks',
  checkUserExistanceMW,
  TaskController.getTasks
);

userRouter.get(
  '/users/:userId/tasks/:taskId',
  checkUserExistanceMW,
  TaskController.getTask
);
userRouter.put(
  '/users/:userId/tasks/:taskId',
  checkUserExistanceMW,
  TaskController.updateTask
);
userRouter.delete(
  '/users/:userId/tasks/:taskId',
  checkUserExistanceMW,
  TaskController.deleteTask
);

userRouter.put('/users/v2/:userId', UserController.updateUserInstance);
userRouter.delete('/users/v2/:userId', UserController.deleteUserInstance);

module.exports = userRouter;
