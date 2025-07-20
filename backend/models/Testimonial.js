const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
  rating: {
    type: Number,
    required: [true, "Please provide a rating"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot be more than 5"],
  },
  message: {
    type: String,
    required: [true, "Please provide a testimonial message"],
    maxlength: [500, "Message cannot be more than 500 characters"],
  },
  course: {
    type: String,
    required: [true, "Please specify the course"],
    trim: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
