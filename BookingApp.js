
const { Sequelize, DataTypes } = require('sequelize');

// initialize Sequelize with database credentials
const sequelize = require('./database')

    const BookingApp = sequelize.define('BookingApp', {
        
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    time: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  
  module.exports= BookingApp;
