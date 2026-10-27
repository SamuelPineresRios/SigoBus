const Usuario = require('../models/Usuarios');
const BusinessError = require('../errors/BusinessError');
const SystemError = require('../errors/SystemError');

const datosPublicos = (usuario) => {
  return {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    carrera: usuario.carrera,
    semestre: usuario.semestre
  };
};

exports.getAll = async () => {
  try {
    const usuarios = await Usuario.findAll();
    return usuarios.map(datosPublicos);
  } catch (error) {
    throw new SystemError('Error al consultar los usuarios');
  }
};

exports.getById = async (id) => {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return null;
    }
    return datosPublicos(usuario);
  } catch (error) {
    throw new SystemError('Error al consultar el usuario');
  }
};

exports.create = async (usuario) => {
  try {
    const nuevoUsuario = await Usuario.create(usuario);
    return datosPublicos(nuevoUsuario);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new BusinessError('Este correo ya está registrado');
    }
    if (error.name === 'SequelizeValidationError') {
      throw new BusinessError('Datos incompletos o inválidos del usuario');
    }
    throw new SystemError('Error al registrar el usuario');
  }
};

exports.update = async (id, dataUsuario) => {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return null;
    }
    usuario.nombre = dataUsuario.nombre;
    usuario.correo = dataUsuario.correo;
    usuario.password = dataUsuario.password;
    usuario.carrera = dataUsuario.carrera;
    usuario.semestre = dataUsuario.semestre;
    await usuario.save();
    return datosPublicos(usuario);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new BusinessError('Este correo ya está registrado');
    }
    if (error.name === 'SequelizeValidationError') {
      throw new BusinessError('Datos incompletos o inválidos del usuario');
    }
    throw new SystemError('Error al actualizar el usuario');
  }
};

exports.delete = async (id) => {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return null;
    }
    await usuario.destroy();
    return datosPublicos(usuario);
  } catch (error) {
    throw new SystemError('Error al eliminar el usuario');
  }
};
