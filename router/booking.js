const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');
const authenticateJWT = require('../middleware/authenticateJWT'); // 引入 authenticateJWT 中介軟體

router.post('/',  authenticateJWT, bookingController.createBooking);
router.get('/', authenticateJWT, bookingController.getBookings);
router.get('/:id',  authenticateJWT, bookingController.getBookingById);
router.put('/:id',  authenticateJWT, bookingController.updateBooking);
router.delete('/:id',  authenticateJWT, bookingController.deleteBooking);

module.exports = router;