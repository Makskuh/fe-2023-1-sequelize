const { User } = require('../models');

module.exports.createUser = async (req, res) => {
  const { body } = req;

  const user = await User.create(body);

  // console.log(user);

  res.send({ data: user });
};

module.exports.getUsers = (req, res) => {};

module.exports.getUser = (req, res) => {};

module.exports.updateUser = (req, res) => {};

module.exports.deleteUser = (req, res) => {
  const {
    params: { userId },
  } = req;

  res.send(`user ${userId} is deleted`);
};
