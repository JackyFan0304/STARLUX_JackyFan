const { Booking, User, Flight } = require('../models');

const bookingController = {
  createBooking: async (req, res) => {
    try {
      // 從請求中取得訂票資訊
      const { userId, flightId, seatNumber } = req.body;

      // 建立新的訂票
      const newBooking = await Booking.create({
        userId,
        flightId,
        seatNumber,
        bookingDate: new Date()
      });

      res.status(201).json(newBooking);
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Error creating booking' });
    }
  },

  getBookings: async (req, res) => {
    try {
      // 取得所有訂票資訊
      const bookings = await Booking.findAll({
        include: [User, Flight]
      });
      res.json(bookings);
    } catch (error) {
      console.error('Error getting bookings:', error);
      res.status(500).json({ error: 'Error getting bookings' });
    }
  },

  getBookingById: async (req, res) => {
    try {
      // 取得指定 ID 的訂票資訊
      const booking = await Booking.findByPk(req.params.id, {
        include: [User, Flight]
      });
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      console.error('Error getting booking:', error);
      res.status(500).json({ error: 'Error getting booking' });
    }
  },

  updateBooking: async (req, res) => {
    try {
      // 更新指定 ID 的訂票資訊
      const { seatNumber } = req.body;
      const [updatedRows] = await Booking.update(
        { seatNumber },
        { where: { id: req.params.id } }
      );
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      const updatedBooking = await Booking.findByPk(req.params.id);
      res.json(updatedBooking);
    } catch (error) {
      console.error('Error updating booking:', error);
      res.status(500).json({ error: 'Error updating booking' });
    }
  },

  deleteBooking: async (req, res) => {
    try {
      // 刪除指定 ID 的訂票
      const deletedRows = await Booking.destroy({
        where: { id: req.params.id }
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json({ message: 'Booking deleted' });
    } catch (error) {
      console.error('Error deleting booking:', error);
      res.status(500).json({ error: 'Error deleting booking' });
    }
  }
};

module.exports = bookingController;