const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Bus = sequelize.define(
  'Bus',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    interno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    modelo: {
      type: DataTypes.STRING
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ruta: {
      type: DataTypes.STRING,
      allowNull: false
    },
    conductor: {
      type: DataTypes.STRING
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Activo'
    }
  },
  {
    tableName: 'buses',
    timestamps: false
  }
);
module.exports = Bus;
