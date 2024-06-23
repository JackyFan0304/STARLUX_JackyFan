const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const squelizePackage = require("sequelize");
const { DataTypes, Model, Sequelize} = squelizePackage;

// 連線到sequelize
const sqlize = new Sequelize("starlux", "root", "P@ssw0rd", {
  host: 'localhost',
  dialect: "mysql"
})

async function authenticate() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Error authenticating to the database:', error);
  }
}

class Flight extends Model {}

Flight.init(
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
    cabin_class: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    flight_cabin_class_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'FlightCabinClass',
        key: 'cabin_class_id',
      },
    },
    flight_price_range_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'FlightPriceRange',
        key: 'price_range_id',
      },
    },
  },
  { sequelize: sqlize, modelName: "Flight", tableName: "Flight"}
);

Flight.sync();
const results = [];

const checkFlights = async (req, res) => {
  try {
    const checkFlight = await Flight.findAll({
      attributes: ['flight_id', 'flight_number', 'departure_city', 'destination_city', 'departure_date', 'arrival_date', 'departure_time', 'arrival_time', 'cabin_class'],
      where: {
        departure_city: req.body.departure_city,
        destination_city: req.body.destination_city,
        departure_date: req.body.departure_date,
        arrival_date: req.body.arrival_date,
        departure_time: req.body.departure_time,
        arrival_time: req.body.arrival_time,
        cabin_class: req.body.cabin_class
      }            
    });
    res.json(checkFlight);
  } catch (error) {
    console.error("Error selecting flights:", error);
    res.status(500).json({ error: "Error selecting flights" });
  }
};

const newFlights = async (req, res) => {
  try {
    const newFlight = await Flight.create({
      flight_id: req.body.flight_id,
      flight_number: req.body.flight_number,
      departure_city: req.body.departure_city,
      destination_city: req.body.destination_city,
      departure_date: req.body.departure_date,
      arrival_date: req.body.arrival_date,
      departure_time: req.body.departure_time,
      arrival_time: req.body.arrival_time,
      cabin_class: req.body.cabin_class
    });
    res.json(newFlight);
  } catch (error) {
    console.error("Error creating flight:", error);
    res.status(500).send("Error creating flight");
  }
};

module.exports = {
    checkFlights,newFlights,
};