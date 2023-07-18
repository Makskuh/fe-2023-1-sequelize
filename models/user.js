'use strict';
const { Model } = require('sequelize');
const { isAfter } = require('date-fns');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
        allowNull: false,
        validate: {
          is: /^[A-Z][a-z]{0,32}$/,
          notNull: true,
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
        allowNull: false,
        validate: {
          is: /^[A-Z][a-z]{0,32}$/,
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      isMale: { type: DataTypes.BOOLEAN, field: 'is_male' },
      birthday: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          isAfter: '1900-01-01',
          isValidDate: (value) => {
            if (isAfter(new Date(value), new Date())) {
              throw new Error('Invalid birthday');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
    }
  );
  return User;
};
