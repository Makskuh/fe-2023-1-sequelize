'use strict';
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const user = require('../models/user');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await sequelize.query('SELECT id FROM users', {
      type: QueryTypes.SELECT,
    });

    const tasks = users
      .map((user, i) => {
        return new Array(7).fill(null).map((x, index) => {
          return {
            body: `Task number ${index + 1}`,
            user_id: user.id,
            is_done: false,
            created_at: new Date(),
            updated_at: new Date(),
          };
        });
      })
      .flat(1);

    await queryInterface.bulkInsert('tasks', tasks);
  },

  async down(queryInterface, Sequelize) {},
};
