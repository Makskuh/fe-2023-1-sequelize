'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // UserGroup
      // UserId, GroupId
      Group.belongsToMany(User, {
        through: 'users_to_groups',
        foreignKey: 'groupId',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
    }
  }
  Group.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      imagePath: { type: DataTypes.TEXT, field: 'image_path' },
      description: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      modelName: 'Group',
      tableName: 'groups',
      underscored: true,
    }
  );
  return Group;
};
