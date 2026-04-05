const Trip = require('../models/Trip');

// @desc    Create a new shopping trip
// @route   POST /api/trips
const createTrip = async (req, res) => {
    try {
        const { storeName, date } = req.body;

        // Validation check
        if (!storeName) {
            return res.status(400).json({ message: "Please add a store name" });
        }

        const newTrip = new Trip({
            storeName,
            date: date || Date.now(),
            items: [], 
            totalSpent: 0
        });

        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);
    } catch (error) {
        // This console log will show the error in your VS Code terminal
        console.error("Error creating trip:", error); 
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all trips
// @route   GET /api/trips
const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find().sort({ date: -1 });
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
const deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);
        if (!trip) return res.status(404).json({ message: "Trip not found" });
        res.status(200).json({ message: "Trip deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTrip, getTrips, deleteTrip };