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
    items: [ItemSchema], // This is our embedded array
    totalSpent: { type: Number, default: 0 },
    userId: { type: String, required: false }
}, { timestamps: true });

// Middleware to calculate totalSpent before saving
// We use a regular function (not arrow function) so we can use 'this'
TripSchema.pre('save', function() {
    if (this.items && this.items.length > 0) {
        this.totalSpent = this.items.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);
    } else {
        this.totalSpent = 0;
    }
    // In modern Mongoose, if you don't accept 'next' as a parameter, 
    // you don't need to call it!
});

module.exports = mongoose.model('Trip', TripSchema);