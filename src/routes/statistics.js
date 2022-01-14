const express = require('express');
const router = express.Router();

const statisticsController = require('../app/controllers/statisticsController');
const { authenticate } = require("../middlewares/authentication");

router.get('/bill', authenticate, statisticsController.showStatisticsBill);
router.post('/billPost/:gte/:lt', statisticsController.specialStatisticsBill);
router.get('/repair', authenticate, statisticsController.showStatisticsRepair);
router.post('/repairPost/:gte/:lt', statisticsController.specialStatisticsRepair);

module.exports = router;