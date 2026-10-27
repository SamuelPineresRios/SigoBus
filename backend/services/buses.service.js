const Bus = require('../models/Bus');
const BusinessError = require('../errors/BusinessError');
const SystemError = require('../errors/SystemError');

exports.getAll = async () => {
  try {
    return await Bus.findAll();
  } catch (error) {
    throw new SystemError('Error al consultar los buses');
  }
};

exports.getById = async (id) => {
  try {
    return await Bus.findByPk(id);
  } catch (error) {
    throw new SystemError('Error al consultar el bus');
  }
};

exports.create = async (bus) => {
  try {
    return await Bus.create(bus);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new BusinessError('Ya existe un bus con ese número interno o placa');
    }
    if (error.name === 'SequelizeValidationError') {
      throw new BusinessError('Datos incompletos o inválidos del bus');
    }
    throw new SystemError('Error al registrar el bus');
  }
};

exports.update = async (id, datoBus) => {
  try {
    const bus = await Bus.findByPk(id);
    if (!bus) {
      return null;
    }
    bus.interno = datoBus.interno;
    bus.placa = datoBus.placa;
    bus.modelo = datoBus.modelo;
    bus.capacidad = datoBus.capacidad;
    bus.ruta = datoBus.ruta;
    bus.conductor = datoBus.conductor;
    bus.estado = datoBus.estado;
    await bus.save();
    return bus;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new BusinessError('Ya existe un bus con ese número interno o placa');
    }
    if (error.name === 'SequelizeValidationError') {
      throw new BusinessError('Datos incompletos o inválidos del bus');
    }
    throw new SystemError('Error al actualizar el bus');
  }
};

exports.delete = async (id) => {
  try {
    const bus = await Bus.findByPk(id);
    if (!bus) {
      return null;
    }
    await bus.destroy();
    return bus;
  } catch (error) {
    throw new BusinessError('Error al eliminar el bus');
  }
};
