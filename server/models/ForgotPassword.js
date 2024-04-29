// Importing mongoose library for MongoDB interaction
const mongoose = require("mongoose");
// Define the OTP schema for MongoDB
const ForgotPasswordSchema = new mongoose.Schema({
    // Field for storing the email address
    email: {
        type: String,
        required: true,
    },
    // Field for storing the OTP (One-Time Password)
    token: {
        type: String,
        required: true,
    },
    // Field for storing the creation date of the OTP document
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 10, // The document will be automatically deleted after 10 minutes of its creation time
    },
});


// Export the OTP model for use in other parts of the application
module.exports =mongoose.model("ForgotPassword",ForgotPasswordSchema);;
