// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert('users', [
//       {
//         first_name: 'Admin',
//         last_name: 'Adminovich',
//         email: 'admin@mail.com',
//         password: 'adminAdmin12345',
//         is_male: true,
//         birthday: new Date(1978, 5, 13),
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         first_name: 'Moder',
//         last_name: 'Moderenko',
//         email: 'moder@mail.com',
//         password: 'notAdminAdmin12345',
//         is_male: true,
//         birthday: new Date(1994, 6, 15),
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ]);
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('users', {
//       email: {
//         [Sequelize.Op.or]: ['admin@mail.com', 'moder@mail.com'],
//       },
//     });
//   },
// };
