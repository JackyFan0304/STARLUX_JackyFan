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
  },
  bookingStatus: {  // 新增的 booking_status 欄位
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Scheduled' // 設定預設值
  }
}, {
  tableName: 'bookings',
  timestamps: true,
  sequelize
});

module.exports = BookingModel;