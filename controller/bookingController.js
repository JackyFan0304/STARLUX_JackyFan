const { Booking, User, Flight } = require('../models');

const bookingController = {
  createBooking: async (req, res) => {
    try {
      const { flightId, seatNumber} = req.body;
      const userId = req.user.userId; // 從已驗證的用戶信息中獲取 userId

      // 建立新的訂票
      const create = await Booking.create({
          userId,
          flightId,
          seatNumber,
          bookingDate: new Date()
      });

      res.status(201).json(create);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Error creating booking by bookingController' });
    }
  },

  // getBookings: async (req, res) => {
  //   try {
  //     // 取得所有訂票資訊
  //     const bookings = await Booking.findAll({
  //       include: [User, Flight]
  //     });
  //     res.json(bookings);
  //   } catch (error) {
  //     console.error('Error getting bookings:', error);
  //     res.status(500).json({ error: 'Error getting bookings' });
  //   }
  // },

  getBookingById: async (req, res) => {
    const userId = req.user.userId; // 確保用戶已登入
    try {
      // 取得該用戶的指定 ID 的訂票資訊
      const booking = await Booking.findOne({
        where: { id: req.params.id, userId }, // 僅獲取該用戶的訂票
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
    const userId = req.user.userId; // 確保用戶已登入
    try {
      const { seatNumber } = req.body;
  
      // 檢查 seatNumber 是否有效
      if (!seatNumber) {
        return res.status(400).json({ error: 'Seat number is required.' });
      }
  
      // 更新指定 ID 的訂票資訊
      const [updatedRows] = await Booking.update(
        { seatNumber },
        { where: { id: req.params.id, userId } } // 僅允許該用戶更新自己的訂票
      );
  
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Booking not found or not authorized to update.' });
      }
  
      // 獲取更新後的訂票資訊
      const updatedBooking = await Booking.findOne({
        where: { id: req.params.id, userId }, // 確保獲取的是該用戶的訂票
        include: [User, Flight] // 如果需要的話，可以包括 User 和 Flight 資訊
      });
  
      res.json(updatedBooking);
    } catch (error) {
      console.error('Error updating booking:', error);
      res.status(500).json({ error: 'Error updating booking' });
    }
  },

  deleteBooking: async (req, res) => {
    const userId = req.user.userId; // 確保用戶已登入
    try {
      // 刪除指定 ID 的訂票
      const deletedRows = await Booking.destroy({
        where: { id: req.params.id, userId } // 僅允許該用戶刪除自己的訂票
      });
  
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Booking not found or not authorized to delete.' });
      }
  
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      console.error('Error deleting booking:', error);
      res.status(500).json({ error: 'Error deleting booking' });
    }
  },

  // 更新機票是否完成狀態
  updateBookingStatus: async (flightId, newStatus) => {
    try {
      // 更新對應航班的所有訂票狀態
      const [updatedRows] = await Booking.update(
        { bookingStatus: newStatus },
        { where: { flightId } } // 根據 flightId 更新所有相關的訂票
      );

      if (updatedRows === 0) {
        console.log('No bookings found for this flight.');
      } else {
        console.log(`${updatedRows} bookings updated to status: ${newStatus}`);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error; // 可以根據需要選擇是否拋出錯誤
    }
  },
};

module.exports = bookingController;