const mileageController = require('./mileageController');
const { Op } = require('sequelize');
const { Flight } = require('../models');

const check = async (req, res) => {
  try {
    const { departure_city, destination_city, departure_date } = req.body;

    // 查詢符合條件的航班
    const checkFlight = await Flight.findAll({
      where: {
        departure_city: {
          [Op.like]: `%${departure_city}%` // 使用模糊匹配
        },
        destination_city: {
          [Op.like]: `%${destination_city}%` // 使用模糊匹配
        },
        departure_date: departure_date // 精確匹配日期
      },
      attributes: ['flight_number', 'departure_city', 
        'destination_city', 'departure_time', 'arrival_time'] // 僅返回指定欄位
    });

    if (checkFlight.length === 0) {
      return res.status(404).json({ message: 'No flights found for the given criteria.' });
    }

    res.json(checkFlight);
  } catch (error) {
    console.error("Error selecting flights:", error);
    res.status(500).json({ error: "Error selecting flights" });
  }
};

const create = async (req, res) => {
  try {
    const createFlight = await Flight.createFlight(req.body);
    res.status(201).json(createFlight);
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const completeFlightAndUpdateStatus = async (req, res) => {
  try {
    // 1. 從請求中獲取需要完成的航班 ID
    const { flightId } = req.body;

    // 2. 更新航班狀態為 "Completed"
    const [updatedRows] = await Flight.update(
      { flight_status: 'Completed' },
      { where: { flight_id: flightId, flight_status: 'Scheduled' } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Flight not found or already completed.' });
    }

    // 3. 獲取更新後的航班資訊
    const updatedFlight = await Flight.findByPk(flightId);

    // 4. 計算里程
    const mileage = mileageController.calculateMileage(updatedFlight);

    // 5. 更新對應的訂票狀態
    await bookingController.updateBookingStatus(flightId, 'Completed');

    // 6. 根據 flightId 找到所有相關的訂票
    const bookings = await Booking.findAll({ 
        where: { flightId },
        include: [User] // 包含用戶資訊
    });

    // 7. 更新每個訂票的用戶里程
    for (const booking of bookings) {
        const userId = booking.userId; // 獲取用戶 ID
        await mileageController.updateUserMileage(userId, mileage); // 更新用戶里程
        console.error('mileage', mileage);
    }

    res.json({ message: 'Flight completed and status updated.' });
  } catch (error) {
    console.error('Error completing flight:', error);
    res.status(500).json({ error: 'Error completing flight' });
  }
};

module.exports = {
  check,
  create,
  completeFlightAndUpdateStatus
};