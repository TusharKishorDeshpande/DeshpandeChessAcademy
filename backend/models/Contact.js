const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, "Phone number cannot be more than 20 characters"],
  },
  subject: {
    type: String,
    trim: true,
    maxlength: [100, "Subject cannot be more than 100 characters"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
    maxlength: [1000, "Message cannot be more than 1000 characters"],
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
