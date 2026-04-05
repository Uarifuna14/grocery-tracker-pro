const express = require('express');
const router = express.Router();
const { 
    createTrip, getTrips, deleteTrip, 
    addItemToTrip, updateItemInTrip, deleteItemFromTrip 
} = require('../controllers/tripController');

// Trip Routes
router.route('/').get(getTrips).post(createTrip);
router.route('/:id').delete(deleteTrip);

// Item Routes (Nested)
router.route('/:id/items').post(addItemToTrip);
router.route('/:id/items/:itemId').put(updateItemInTrip).delete(deleteItemFromTrip);

module.exports = router;