const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuarios");
const BusinessError = require("../errors/BusinessError");
const SystemError = require("../errors/SystemError");
const token = require("../utils/jwt");

const login = async ({ correo, password }) => {
  try {
    const usuario = await Usuario.findOne({
      where: { correo },
    });
    if (!usuario) {
      throw new BusinessError("Credenciales inválidas");
    }
    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      throw new BusinessError("Credenciales inválidas");
    }
    return token.generateToken({
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo
    });
  } catch (error) {
    if (error instanceof BusinessError) {
      throw error;
    }
    throw new SystemError("Error al iniciar sesión");
  }
};
module.exports = {
  login,
};
