'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [usuarios] = await queryInterface.sequelize.query(
      'SELECT id, password FROM usuarios'
    );

    for (const usuario of usuarios) {
      if (!usuario.password) {
        continue;
      }
      if (usuario.password.startsWith('$2')) {
        continue;
      }
      const passwordHash = await bcrypt.hash(usuario.password, 10);
      await queryInterface.sequelize.query(
        'UPDATE usuarios SET password = ? WHERE id = ?',
        {
          replacements: [passwordHash, usuario.id]
        }
      );
    }
  },

  async down (queryInterface, Sequelize) {
  }
};
