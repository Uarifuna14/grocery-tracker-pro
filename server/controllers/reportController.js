const Trip = require('../models/Trip');
const mongoose = require('mongoose');

// @desc    Get total spending grouped by Category
// @route   GET /api/reports/category-stats
const getCategoryStats = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Not authorized, no user found" });
        }

        // ✅ FIX: Use the ID as a string to match the Trip model (userId: { type: String })
        const userId = req.user._id.toString();

        const stats = await Trip.aggregate([
            // 1. Match user (matching string to string)
            { $match: { userId: userId } },

            // 2. Flatten items array
            { $unwind: "$items" },

            // 3. Convert values safely
            {
                $project: {
                    category: "$items.category",
                    price: { $toDouble: { $ifNull: ["$items.price", 0] } },
                    quantity: { $toDouble: { $ifNull: ["$items.quantity", 0] } }
                }
            },

            // 4. Group by category
            {
                $group: {
                    _id: "$category",
                    totalAmount: {
                        $sum: { $multiply: ["$price", "$quantity"] }
                    },
                    itemCount: { $sum: 1 }
                }
            },

            // 5. Sort highest spending first
            { $sort: { totalAmount: -1 } }
        ]);

        return res.status(200).json(stats || []);

    } catch (error) {
        console.error("Category Stats Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Get monthly spending summary
// @route   GET /api/reports/monthly-stats
const getMonthlyStats = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Not authorized, no user found" });
        }

        // ✅ FIX: Use the ID as a string to match the Trip model
        const userId = req.user._id.toString();

        const stats = await Trip.aggregate([
            // 1. Match user
            { $match: { userId: userId } },

            // 2. Ensure totalSpent is numeric and extract month
            {
                $project: {
                    month: { $month: "$date" },
                    totalSpent: { $toDouble: { $ifNull: ["$totalSpent", 0] } }
                }
            },

            // 3. Group by month
            {
                $group: {
                    _id: "$month",
                    totalSpent: { $sum: "$totalSpent" },
                    tripCount: { $sum: 1 }
                }
            },

            // 4. Sort Jan → Dec
            { $sort: { _id: 1 } }
        ]);

        return res.status(200).json(stats || []);

    } catch (error) {
        console.error("Monthly Stats Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategoryStats,
    getMonthlyStats
};