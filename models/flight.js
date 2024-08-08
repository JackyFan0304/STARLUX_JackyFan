const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FlightModel = sequelize.define('Flight', 
  {
    flight_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    flight_number: {
      type: DataTypes.STRING,
    },
    departure_city: {
      type: DataTypes.STRING,
    },
    destination_city: {
      type: DataTypes.STRING,
    },
    departure_date: {
      type: DataTypes.DATEONLY,
      format: 'YYYY-MM-DD'
    },
    arrival_date: {
      type: DataTypes.DATEONLY,
      format: 'YYYY-MM-DD'
    },
    departure_time: {
      type: DataTypes.TIME,
      format: 'HH:MM:00'
    },
    arrival_time: {
      type: DataTypes.TIME,
      format: 'HH:MM:00'
    },
    airline: {
      type: DataTypes.STRING,
    },
    flight_status: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    // flight_cabin_class_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'FlightCabinClass',
    //     key: 'cabin_class_id',
    //   },
    // },
    // flight_price_range_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'FlightPriceRange',
    //     key: 'price_range_id',
    //   },
    // },
  },
  {
    tableName: "flight",
    timestamps: true,
    sequelize
  }
);

FlightModel.createFlight = async (flightData) => {
  try {
    const createFlight = await FlightModel.create(flightData);
    return createFlight;
  } catch (error) {
    throw error;
  }
};

FlightModel.checkFlights = async (flightData) => {
  try {
    const checkFlight = await FlightModel.findAll({
      attributes: ['flight_id', 'flight_number', 'departure_city', 'destination_city', 'departure_date', 'arrival_date', 'departure_time', 'arrival_time'],
      where: {
        departure_city: flightData.departure_city,
        destination_city: flightData.destination_city,
        departure_date: flightData.departure_date,
        arrival_date: flightData.arrival_date,
        departure_time: flightData.departure_time,
        arrival_time: flightData.arrival_time
      }            
    });
    return checkFlight;
  } catch (error) {
    throw error;
  }
};

module.exports = FlightModel;