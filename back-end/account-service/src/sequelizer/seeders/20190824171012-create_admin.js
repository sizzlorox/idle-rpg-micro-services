const bcrypt = require('bcrypt');
'use strict';

// TODO: Change this to a real email before release!
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accounts', [{
      email: 'test@admin.com',
      password: await bcrypt.hash('12345', 10),
      isActive: false,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], { logging: console.log });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {});
  }
};
