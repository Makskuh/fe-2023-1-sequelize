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

module.exports.getUser = async (req, res) => {
  const {
    params: { userId },
  } = req;

  // завжди повертає один
  // const user = await User.findOne({
  //   where: {
  //     id: userId,
  //   },
  // });

  // шукає по первинному ключу
  const user = await User.findByPk(userId, {
    attributes: {
      exclude: ['password'],
    },
  });

  res.send({ data: user });
};

module.exports.updateUser = async (req, res) => {
  const {
    body,
    params: { userId },
  } = req;

  const [usersUpdated, [updatedUser]] = await User.update(body, {
    where: {
      id: userId,
    },
    returning: true,
    // returning: ['id', 'firstName'],
  });

  const userWithoutPassword = updatedUser.get();

  delete userWithoutPassword.password;
  userWithoutPassword.password = undefined;

  res.send({ data: userWithoutPassword });
};

module.exports.updateUserInstance = async (req, res) => {
  const {
    body,
    params: { userId },
  } = req;

  const userToUpdate = await User.findByPk(userId);

  const updatedUser = await userToUpdate.update(body);

  res.send({ data: updatedUser });
};

module.exports.deleteUser = (req, res) => {
  const {
    params: { userId },
  } = req;

  res.send(`user ${userId} is deleted`);
};
