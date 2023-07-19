const { Task, User } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const {
      body,
      params: { userId },
    } = req;

    // const newTask = await Task.create({ ...body, userId });

    const user = await User.findByPk(userId);
    const newTask = await user.createTask(body);

    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};
