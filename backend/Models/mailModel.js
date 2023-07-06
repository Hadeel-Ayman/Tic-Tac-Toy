const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,

    },
    message: {
        type: String,
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);