const mongoose = require('mongoose');

// Define the schema
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    person: {
        type: String,
        required: true
    },
    reservationDate: {
        type: Date,
        required: true
    },
    reservationTime: {
        type: String,
        required: true
    },
    message: {
        type: String
    }
});

// Create the model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
