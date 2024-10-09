'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('products', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
   })
  },

  async down (queryInterface, ) {
  await queryInterface.removeColumn('products', 'description')
  }
};
