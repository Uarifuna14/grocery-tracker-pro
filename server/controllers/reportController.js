const Trip = require('../models/Trip');

// @desc    Get total spending grouped by Category
// @route   GET /api/reports/category-stats
const getCategoryStats = async (req, res) => {
    try {
        const stats = await Trip.aggregate([
            // Stage 1: Deconstruct the items array (flatten the data)
            { $unwind: "$items" },
            
            // Stage 2: Group by category and sum up (price * quantity)
            {
                $group: {
                    _id: "$items.category",
                    totalAmount: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
                    itemCount: { $sum: 1 }
                }
            },
            
            // Stage 3: Sort by highest spending
            { $sort: { totalAmount: -1 } }
        ]);

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get monthly spending summary
// @route   GET /api/reports/monthly-stats
const getMonthlyStats = async (req, res) => {
    try {
        const stats = await Trip.aggregate([
            {
                $group: {
                    _id: { $month: "$date" }, // Extract month number
                    totalSpent: { $sum: "$totalSpent" },
                    tripCount: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } } // Sort by month (Jan to Dec)
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCategoryStats, getMonthlyStats };