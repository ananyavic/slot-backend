const userModel = require('../model/userModel')
const fs = require("fs/promises");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function addUser(user){
    const UserDoc = new userModel(user);
    console.log(user);
    return await UserDoc.save();
}


async function registerUser(user) {
    console.log("User data:", user);
    try {

        const existingUser = await userModel.findOne({ email: user.emailId });
        console.log("existingUser", existingUser);
        
        if (existingUser) {
            console.log("Email already exists.");
            return { status: 400, message: "Email already exists." };
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Create a new user document with hashed password
        const newUser = new userModel({
            ...user,
            password: hashedPassword
        });

        const result = await newUser.save();
        const userID = result._id
        console.log("userID",userID)

        const payload = {userId: userID};
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        
        console.log("User registered successfully.");
        return { status: 200, message: "User registered successfully." ,token, userID};

    } catch (error) {
        console.log("Error during registration:", error);
        throw new Error("Registration failed.");
    }
}




// Login an existing user
async function loginUser(user) {
    console.log("Login attempt:", user);
    try {
        // Check if the user exists
        const existingUser = await userModel.findOne({ emailId: user.emailId });
        console.log(existingUser);
        
        if (!existingUser) {
            console.log("User not registered. Please sign up first.");
            return { status: 400, message: "User not registered. Please sign up first." };
        }

        // Validate password
        const isMatch = await bcrypt.compare(user.password, existingUser.password);
        if (!isMatch) {
            console.log("Invalid credentials.");
            return { message: "Invalid credentials." };
        }

        // Generate JWT token   
        const payload = { userId: existingUser._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(existingUser._id);
        const userId = existingUser._id
        console.log("User logged in successfully.");
        return { status: 200, message: "Login successful.", token, userId };

    } catch (error) {
        console.log("Login failed:", error);
        throw new Error("Login failed.");
    }
}





module.exports = {
    addUser, registerUser, loginUser
};

