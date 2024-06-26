const Booking = require('./booking');
const User = require('./user');
const Flight = require('./flight');

Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Flight, { foreignKey: 'flightId' });

module.exports = {
  Booking,
  User,
  Flight
};