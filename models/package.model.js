const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    destination: String,
    availableDates: {
        type: [Date]
    },
    image: String,
    category: {
        type: [String],
        enum: ['Mountain', 'Beach', 'Grasslands']
    }
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
