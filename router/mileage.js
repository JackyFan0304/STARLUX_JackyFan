const express = require('express');
const router = express.Router();
const mileageController = require('../controller/mileageController');

// 設定用於測試的路由
router.post('/complete-flight', mileageController.completeFlightAndUpdateStatus);

module.exports = router;