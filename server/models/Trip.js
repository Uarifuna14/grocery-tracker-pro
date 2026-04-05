const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true, default: 1 },
    category: { 
        type: String, 
        enum: ['Food', 'Drinks', 'Toiletries', 'Other'], 
        default: 'Other' 
    }
});

const TripSchema = new mongoose.Schema({
    storeName: { type: String, required: true },
    date: { type: Date, default: Date.now },
    items: [ItemSchema], // Array of embedded documents
    totalSpent: { type: Number, default: 0 },
    userId: { type: String, required: false } // We'll link this in Phase 3
}, { timestamps: true });

// Middleware to calculate totalSpent before saving
TripSchema.pre('save', function(next) {
    this.totalSpent = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    next();
});

module.exports = mongoose.model('Trip', TripSchema);