'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      interno: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      placa: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      modelo: {
        type: Sequelize.STRING
      },
      capacidad: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ruta: {
        allowNull: false,
        type: Sequelize.STRING
      },
      conductor: {
        type: Sequelize.STRING
      },
      estado: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'Activo'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('buses');
  }
};
