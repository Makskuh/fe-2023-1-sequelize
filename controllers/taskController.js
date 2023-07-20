const createHttpError = require('http-errors');
const { Task, User } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, user } = req;

    // const newTask = await Task.create({ ...body, userId });

    const newTask = await user.createTask(body);

    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};

module.exports.getTasks = async (req, res, next) => {
  try {
    const { user } = req;

    // const tasks = await Task.findAll({
    //   where: {
    //     userId
    //   }
    // });

    const tasks = await user.getTasks();

    res.send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.getTask = async (req, res, next) => {
  try {
    const {
      user,
      params: { taskId },
    } = req;

    // const task = await Task.findOne({
    //   where: {
    //     id: taskId,
    //     userId
    //   }
    // });

    const task = await Task.findByPk(taskId);

    const userHasTask = await user.hasTask(task);

    if (!userHasTask) {
      return next(createHttpError(404, 'User doesnt have this task'));
    }

    res.send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      body,
      user,
      params: { taskId },
    } = req;

    const [updateCount, [updatedTask]] = await Task.update(body, {
      where: {
        id: taskId,
        userId: user.id,
      },
      fields: ['body', 'isDone', 'updatedAt', 'deadline'],
      returning: true,
    });

    if (updateCount !== 1) {
      return next(createHttpError(404, 'Task not found'));
    }

    res.send({ data: updatedTask });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      user,
      params: { taskId },
    } = req;

    const task = await Task.findOne({
      where: {
        id: taskId,
        userId: user.id,
      },
    });

    if (!task) {
      return next(createHttpError(404, 'Task not found'));
    }

    await task.destroy();

    res.send({ data: task });
  } catch (error) {
    next(error);
  }
};
