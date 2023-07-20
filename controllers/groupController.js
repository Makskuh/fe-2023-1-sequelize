const createHttpError = require('http-errors');
const { Group, User } = require('../models');

module.exports.createGroup = async (req, res, next) => {
  try {
    const {
      body: { userId, ...groupData },
    } = req;

    const author = await User.findByPk(userId);

    if (!author) {
      return next(createHttpError(404, 'User doesnt exist'));
    }

    const newGroup = await Group.create(groupData);

    await newGroup.addUser(author);

    res.status(201).send({ data: newGroup });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserGroups = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const user = await User.findByPk(userId);

    if (!user) {
      return next(createHttpError(404, 'User doesnt exist'));
    }

    const groups = await user.getGroups();

    res.send({ data: groups });
  } catch (error) {
    next(error);
  }
};
