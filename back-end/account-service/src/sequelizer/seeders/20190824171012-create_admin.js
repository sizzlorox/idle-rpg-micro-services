require('dotenv').config();
const crypto = require('crypto');
'use strict';

// TODO: Change this to a real email before release!
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accounts', [{
      email: 'test@admin.com',
      password: await crypto.createHmac('sha256', process.env.HASH_SECRET)
        .update('test')
        .digest('hex'),
      isActive: true,
      isLoggedIn: false,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], { logging: console.log });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {});
  }
};
