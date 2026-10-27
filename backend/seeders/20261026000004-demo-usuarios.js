'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const passwordSamuel = await bcrypt.hash('1017', 10);
    const passwordEmmanuel = await bcrypt.hash('123', 10);
    const passwordJulian = await bcrypt.hash('julian123', 10);

    await queryInterface.bulkInsert('usuarios', [
      {
        nombre: 'Samuel Piñeres',
        correo: 'samuel@tdea.edu.co',
        password: passwordSamuel,
        carrera: 'Tecnologia profesional en sistemas',
        semestre: 3
      },
      {
        nombre: 'Emmanuel Díaz',
        correo: 'emma@tdea.edu.co',
        password: passwordEmmanuel,
        carrera: 'Tecnologia profesional en sistemas',
        semestre: 3
      },
      {
        nombre: 'Julian Soto',
        correo: 'julian@tdea.edu.co',
        password: passwordJulian,
        carrera: 'Psicologia',
        semestre: 5
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
