const { Op } = require('sequelize');
const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    // console.log(user);

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll(); // SELECT * from users;

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

    // const users = await User.findAll({
    //   where: {
    //     [Op.or]: [{ firstName: 'User' }, { id: 2 }],
    //   },
    // }); // SELECT * from users WHERE isMale = true;

    res.send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
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

    if(usersUpdated !== 1) {
      throw new Error('User not found');
    }

    const userWithoutPassword = updatedUser.get();

    delete userWithoutPassword.password;
    userWithoutPassword.password = undefined;

    res.send({ data: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const {
      body,
      params: { userId },
    } = req;

    const userToUpdate = await User.findByPk(userId);

    const updatedUser = await userToUpdate.update(body);

    res.send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const amountDeleted = await User.destroy({
      where: {
        id: userId,
      },
    });

    res.send({ data: amountDeleted });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserInstance = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const user = await User.findByPk(userId);

    await user.destroy();

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};
