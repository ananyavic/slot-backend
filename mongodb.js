const mongoose=require("mongoose");
const BookingModel = require('../model/bookingModel.js')


const URL = 'mongodb+srv://AdminLogin:ArNav5403@mernprojectdata.ft9db.mongodb.net/';

const mongoURL = "mongodb://localhost:27017/bookings    "


mongoose.connect(mongoURL)
.then((success)=>{
    console.log("connected......")
    require('../model/bookingModel.js');
    require('../model/userModel.js');
    require('../model/slotModel.js');

})
.catch(err=>console.log(err));

module.exports =mongoose;