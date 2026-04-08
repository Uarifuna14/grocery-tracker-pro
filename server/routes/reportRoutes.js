const express = require('express');
const router = express.Router();
const { getCategoryStats } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware'); // Your auth protector

// This route MUST have protect
router.get('/category-stats', protect, getCategoryStats);

module.exports = router;