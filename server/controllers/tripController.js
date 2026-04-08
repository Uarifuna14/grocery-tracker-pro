const Trip = require('../models/Trip');

// --- HELPER FUNCTION (prevents duplicate logic) ---
const calculateTotal = (items) => {
    return items.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return sum + (price * quantity);
    }, 0);
};

// --- CREATE TRIP ---
const createTrip = async (req, res) => {
    try {
        const { storeName, date } = req.body;

        const newTrip = new Trip({
            storeName,
            date,
            items: [],
            totalSpent: 0,
            userId: req.user._id
        });

        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- GET TRIPS ---
const getTrips = async (req, res) => {
    try {
        const trips = await Trip
            .find({ userId: req.user._id })
            .sort({ date: -1 });

        res.status(200).json(trips);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- DELETE TRIP ---
const deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!trip) {
            return res.status(404).json({ message: "Trip not found or unauthorized" });
        }

        await trip.deleteOne();
        res.status(200).json({ message: "Trip deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- ADD ITEM ---
const addItemToTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        const { name, price, quantity, category } = req.body;

        const newItem = {
            name,
            price: Number(price) || 0,
            quantity: Number(quantity) || 0,
            category
        };

        trip.items.push(newItem);

        // Recalculate total
        trip.totalSpent = calculateTotal(trip.items);

        await trip.save();
        res.status(201).json(trip);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- UPDATE ITEM ---
const updateItemInTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        const item = trip.items.id(req.params.itemId);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Update fields safely
        if (req.body.name !== undefined) item.name = req.body.name;
        if (req.body.price !== undefined) item.price = Number(req.body.price) || 0;
        if (req.body.quantity !== undefined) item.quantity = Number(req.body.quantity) || 0;
        if (req.body.category !== undefined) item.category = req.body.category;

        // Recalculate total
        trip.totalSpent = calculateTotal(trip.items);

        await trip.save();
        res.status(200).json(trip);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- DELETE ITEM ---
const deleteItemFromTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        trip.items.pull({ _id: req.params.itemId });

        // Recalculate total
        trip.totalSpent = calculateTotal(trip.items);

        await trip.save();
        res.status(200).json(trip);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createTrip,
    getTrips,
    deleteTrip,
    addItemToTrip,
    updateItemInTrip,
    deleteItemFromTrip
};