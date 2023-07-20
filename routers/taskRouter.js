const taskRouter = require('express').Router();
const TaskController = require('../controllers/taskController');
const { checkUserExistanceMW } = require('../middlewares/users.mv');

taskRouter.post(
  '/users/:userId/tasks',
  checkUserExistanceMW,
  TaskController.createTask
);
taskRouter.get(
  '/users/:userId/tasks',
  checkUserExistanceMW,
  TaskController.getTasks
);

taskRouter.get(
  '/users/:userId/tasks/:taskId',
  checkUserExistanceMW,
  TaskController.getTask
);
taskRouter.put(
  '/users/:userId/tasks/:taskId',
  checkUserExistanceMW,
  TaskController.updateTask
);
taskRouter.delete(
  '/users/:userId/tasks/:taskId',
  checkUserExistanceMW,
  TaskController.deleteTask
);

module.exports = taskRouter;