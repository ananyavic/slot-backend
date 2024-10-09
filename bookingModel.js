const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    slotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true 
    },
    vehicleType: {
        type: String,
        required: true
    },
    timeFrom: { 
        type: String,
        required: true
    },
    timeTo: {
        type: String, 
        required: true 
    },
    amount: {
        type: Number,
        required: true 
    },
  }, { timestamps: true });


 const BookingData = mongoose.model('Bill', bookingSchema);
module.exports = BookingData;
