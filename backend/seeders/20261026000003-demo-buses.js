'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('buses', [
      {
        interno: 'TDE-456',
        placa: 'WFG-234',
        modelo: 'Volvo 8700',
        capacidad: 40,
        ruta: 'Ruta 2: Estación Itagüí ↔ Campus TdeA',
        conductor: 'Andrés Restrepo',
        estado: 'Activo'
      },
      {
        interno: 'TDE-1023',
        placa: 'SMK-500',
        modelo: 'Mercedes Senior',
        capacidad: 40,
        ruta: 'Ruta 1: Chimeneas ↔ Campus TdeA',
        conductor: 'Emmanuel Diaz',
        estado: 'Activo'
      },
      {
        interno: 'XXM-102',
        placa: 'TPK-205',
        modelo: 'Ford',
        capacidad: 43,
        ruta: 'Ruta 3: Envigado ↔ Campus TdeA',
        conductor: 'Samuel Rios',
        estado: 'Activo'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('buses', null, {});
  }
};
