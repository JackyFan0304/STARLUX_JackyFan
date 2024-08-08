const { Booking, User, Flight } = require('../models');
const bookingController = require('./bookingController');

const mileageController = {
    // 更新航班狀態
    completeFlightAndUpdateStatus: async (req, res) => {
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
        const mileage = calculateMileage(updatedFlight);

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
            await updateUserMileage(userId, mileage); // 更新用戶里程
            console.error('mileage', mileage);
        }
  
        res.json({ message: 'Flight completed and status updated.' });
      } catch (error) {
        console.error('Error completing flight:', error);
        res.status(500).json({ error: 'Error completing flight' });
      }
    },
};  

// 計算里程的函數
const calculateMileage = (flight) => {
    // 根據出發地和目的地的城市名稱計算里程
    const { departure_city, destination_city } = flight;
  
    // 簡單根據距離定義里程
    let mileage;
    if (departure_city === 'Taipei' && destination_city === 'Hong Kong') {
      mileage = 700;
    } else if (departure_city === 'Hong Kong' && destination_city === 'Tokyo') {
      mileage = 1800;
    } else if (departure_city === 'Tokyo' && destination_city === 'Seoul') {
      mileage = 900;
    } else if (departure_city === 'Seoul' && destination_city === 'Taipei') {
      mileage = 1500;
    } else {
      // 如果沒有匹配的城市組合，可以返回 0 或拋出錯誤
      throw new Error(`Invalid flight route: ${departure_city} to ${destination_city}`);
    }
    return mileage;
};

// 根據用戶 ID 和里程更新用戶的里程數
const updateUserMileage = async (userId, mileage) => {
    try {
      // 查找用戶並更新其里程數
      console.log(`Updating mileage for user ID: ${userId}`);
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // 確保 user.mileage 是一個數字
      console.log(`Current mileage for user ${userId}: ${user.mileage}`);
  
      // 更新用戶里程
      user.mileage += mileage; // 累加里程
      await user.save(); // 保存更改
  
      console.log(`User ${userId} mileagce updated to ${user.mileage}`);
    } catch (error) {
      console.error('Error updating user mileage:', error);
      throw error; // 根據需要選擇是否拋出錯誤
    }
};

module.exports = mileageController;