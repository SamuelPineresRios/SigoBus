const busService = require('../services/buses.service');

exports.getAll = async (req, res, next) => {
  try {
    const buses = await busService.getAll();
    res.json(buses);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const bus = await busService.getById(req.params.id);
    if (!bus) {
      return res.status(404).json({
        mensaje: 'Bus no encontrado'
      });
    }
    res.json(bus);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const bus = await busService.create(req.body);
    res.status(201).json(bus);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const bus = await busService.update(req.params.id, req.body);
    if (!bus) {
      return res.status(404).json({
        mensaje: 'Bus no encontrado'
      });
    }
    res.json(bus);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const bus = await busService.delete(req.params.id);
    if (!bus) {
      return res.status(404).json({
        mensaje: 'Bus no encontrado'
      });
    }
    res.json(bus);
  } catch (error) {
    next(error);
  }
};
