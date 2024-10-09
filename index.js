const express = require('express');
const cors = require("cors");
const mongoose = require('./config/mongodb.js');
const multer=require("multer");

const slotApi = require('./api/slotApi.js');
const userApi = require('./api/userApi');
const bookingApi = require('./api/bookingApi.js');
const { protect } = require('./authMiddleware.js');



const app=express();
const port = 5000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, ()=>console.log(`application server started on port ${port} ...`));


app.get("/slots/getall", protect,  async function (request, response) {
    try {
      const { vehicleType } = request.query;  
      const data = await slotApi.getAllSlots(vehicleType);  
      console.log(data);
      response.send(data);  // Send the data to the client
    } catch (error) {
      console.error('Error fetching slots:', error);
      response.status(500).send({ error: "Error fetching slots" });
    }
  });

app.get("/bookings/getall", async function(request, response){
    try{
    const data = await bookingApi.getAllBookings();
    console.log(data);
    response.send(data);
    }
    catch(error){
        
    }
});

app.post("/bookings/add", async function(request, response) {
    try {
        const bookingDetails = request.body; 
        const newBooking = await bookingApi.addBooking(bookingDetails);
        console.log("New booking added:", newBooking);
        response.status(201).send(newBooking); 
    } catch (error) {
        console.error("Error adding booking:", error);
        response.status(500).send({ error: "Failed to add booking" }); 
    }
});

app.get("/user/getall",async function(request,response){
    try{
        const data=await getAllUsers();
        console.log(data);
        response.send(data);
    }
    catch(error){

    }
    
})

app.get("/booking/getall",async function(request,response){
    try{
        const data=await getAllBookings();
        console.log(data);
        response.send(data);
    }
    catch(error){

    }
    
});


app.post("/user/register", async function(request, response){
    console.log("registerUser",request.body);
    const data=await userApi.registerUser(request.body);    
    response.send(data);
});

app.post("/user/login", async function(request, response){
    const { emailId, password } = request.body;
    console.log("loginUser",request.body);

    const data=await userApi.loginUser(request.body);    
    console.log(data);
    
    response.send(data);
});

app.post("/slot/add", async function(request, response){
    console.log("SlotAdd",request.body);
    const data=await slotApi.addSlot(request.body);    
    response.send(data);
});
app.delete("/slot/delete/:_id",async function(request,response){
    const data=await slotApi.deleteSlotById(request.params._id);
    response.send(data);
})

// app.put("/employees/update/:_id", async function(request, response){
//     // console.log("from client:", request.body); 
//     console.log(request.body);
//      const {_id, ...employee}=request.body;
//      console.log(employee);
//      const data=await mongodbapi.updateEmployee(request.params._id ,employee);
//      response.send(data);

app.put("/slots/update/:id", async function (request, response) {
    const data = await slotApi.updateSlot(request.params.id);
    response.send(data);
    
})

require("./config/mongodb")
require('dotenv').config();
  

