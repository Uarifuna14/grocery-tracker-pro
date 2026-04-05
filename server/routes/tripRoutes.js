const express = require('express');
const router = express.Router();
const { createTrip, getTrips, deleteTrip } = require('../controllers/tripController');

// Route for "/" which maps to /api/trips
router.route('/').get(getTrips).post(createTrip);

// Route for "/:id" which maps to /api/trips/12345
router.route('/:id').delete(deleteTrip);

module.exports = router;