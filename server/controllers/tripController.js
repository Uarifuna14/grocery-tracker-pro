const Trip = require('../models/Trip');

// --- TRIP OPERATIONS ---

const createTrip = async (req, res) => {
    try {
        const { storeName, date } = req.body;
        const newTrip = new Trip({ storeName, date, items: [] });
        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find().sort({ date: -1 });
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);
        if (!trip) return res.status(404).json({ message: "Trip not found" });
        res.status(200).json({ message: "Trip deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- ITEM OPERATIONS (Inside the Trip) ---

// @desc    Add an item to a trip
// @route   POST /api/trips/:id/items
const addItemToTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        const newItem = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category
        };

        trip.items.push(newItem);
        await trip.save(); // This triggers our 'pre-save' totalSpent calculation!
        res.status(201).json(trip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update an item inside a trip
// @route   PUT /api/trips/:id/items/:itemId
const updateItemInTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        const item = trip.items.id(req.params.itemId);
        if (!item) return res.status(404).json({ message: "Item not found" });

        // Update fields
        item.name = req.body.name || item.name;
        item.price = req.body.price || item.price;
        item.quantity = req.body.quantity || item.quantity;
        item.category = req.body.category || item.category;

        await trip.save();
        res.status(200).json(trip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete an item from a trip
// @route   DELETE /api/trips/:id/items/:itemId
const deleteItemFromTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        // Remove the item from the array
        trip.items.pull({ _id: req.params.itemId });
        
        await trip.save();
        res.status(200).json(trip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { 
    createTrip, getTrips, deleteTrip, 
    addItemToTrip, updateItemInTrip, deleteItemFromTrip 
};