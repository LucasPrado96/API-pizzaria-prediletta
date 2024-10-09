'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('users', {

      id:{
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },

      name:{
        allowNull:false,
        type: Sequelize.STRING,
      },

      admin:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      email:{
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },

      password_hash:{
        allowNull: false,
        type: Sequelize.STRING,
      },

      phone: {
        type: Sequelize.STRING,
        allowNull:false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users')
  }
};
