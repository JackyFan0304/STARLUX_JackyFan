const Booking = require('./booking');
const User = require('./user');
const Flight = require('./flight');

Booking.belongsTo(User, { foreignKey: 'id' });
Booking.belongsTo(Flight, { foreignKey: 'flight_id' });

module.exports = {
  Booking,
  User,
  Flight
};