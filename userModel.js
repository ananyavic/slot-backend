const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        trim : true,
    },
    emailId:{
        type: String,
        required: true,
        trim : true,
        unique: true,
        lowercase: true
    },
    contactNum:{
        type: Number,
    },
    password:{
        type: String,
        required: true,
        
    },
    proficPic:{
        data: Buffer,
        contentType: String
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

