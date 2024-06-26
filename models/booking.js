const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BookingModel = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  flightId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Flight',
      key: 'flight_id'
    }
  },
  seatNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'bookings',
  timestamps: true,
  sequelize
});

module.exports = BookingModel;