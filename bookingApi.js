const BookingData = require('../model/bookingModel');
 
async function getAllBookings() {
    const result = await BookingData.find({}).exec();
    console.log("result", result);
    return result;
    
} 



async function addBooking(bookingDetails) {
    try {
        const newBooking = new BookingData(bookingDetails);
        const result = await newBooking.save();
        console.log("Booking added:", result);
        return result;
    } catch (error) {
        console.error("Error adding booking:", error);
        throw error; 
    }
}




module.exports = {
    getAllBookings, addBooking
};