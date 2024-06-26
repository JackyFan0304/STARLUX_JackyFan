const { Flight } = require('../models');

const checkFlights = async (req, res) => {
  try {
    const checkFlight = await Flight.checkFlights(req.body);
    res.json(checkFlight);
  } catch (error) {
    console.error("Error selecting flights:", error);
    res.status(500).json({ error: "Error selecting flights" });
  }
};

const createFlight = async (req, res) => {
  try {
    const createFlight = await Flight.createFlight(req.body);
    res.status(201).json(createFlight);
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  checkFlights,
  createFlight
};