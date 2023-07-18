const { Op } = require('sequelize');
const { User } = require('../models');

module.exports.createUser = async (req, res) => {
  const { body } = req;

  const user = await User.create(body);

  // console.log(user);

  res.send({ data: user });
};

module.exports.getUsers = async (req, res) => {
  // const users = await User.findAll(); // SELECT * from users;

  // const users = await User.findAll({
  //   attributes: ['firstName', 'email', 'isMale']
  // }); // SELECT firstName, email, isMale from users;

  // const users = await User.findAll({
  //   attributes: [['first_name', 'name'], 'email', 'isMale'],
  // }); // SELECT firstName as name, email, isMale from users;

  // const users = await User.findAll({
  //   attributes: {
  //     exclude: ['password', 'createdAt', 'updatedAt'],
  //   },
  // }); // SELECT все крім password, createdAt, updatedAt from users;

  // const users = await User.findAll({
  //   where: {
  //     isMale: true,
  //   },
  // }); // SELECT * from users WHERE isMale = true;

  const users = await User.findAll({
    where: {
      [Op.or]: [{ firstName: 'User' }, { id: 2 }],
    },
  }); // SELECT * from users WHERE isMale = true;

  res.send({ data: users });
};

module.exports.getUser = (req, res) => {};

module.exports.updateUser = (req, res) => {};

module.exports.deleteUser = (req, res) => {
  const {
    params: { userId },
  } = req;

  res.send(`user ${userId} is deleted`);
};
