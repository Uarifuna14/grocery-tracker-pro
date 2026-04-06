const express = require('express');
const router = express.Router();
const { getCategoryStats, getMonthlyStats } = require('../controllers/reportController');

router.get('/category-stats', getCategoryStats);
router.get('/monthly-stats', getMonthlyStats);

module.exports = router;