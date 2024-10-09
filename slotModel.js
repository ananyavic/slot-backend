const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    slotNo:{
        type: Number,
        required: true,
        unique: true,
    },
    isAvailable:{
        type: Boolean,
        default: false
    },
 
    vehicleType:{
        type: String,
        required: true,
        enum: ['2-wheeler', '4-wheeler'],

    }
});

const Slot = mongoose.model('Slot', slotSchema);
module.exports = Slot;


