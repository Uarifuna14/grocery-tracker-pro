const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import protector
const { 
    createTrip, getTrips, deleteTrip, 
    addItemToTrip, updateItemInTrip, deleteItemFromTrip 
} = require('../controllers/tripController');

// All routes now require the 'protect' middleware
router.route('/').get(protect, getTrips).post(protect, createTrip);
router.route('/:id').delete(protect, deleteTrip);

router.route('/:id/items').post(protect, addItemToTrip);
router.route('/:id/items/:itemId').put(protect, updateItemInTrip).delete(protect, deleteItemFromTrip);

module.exports = router;