const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a tournament title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a tournament description"],
    maxlength: [1000, "Description cannot be more than 1000 characters"],
  },
  banner: {
    type: String,
    default: "",
  },
  formLink: {
    type: String,
    required: [true, "Please provide a registration form link"],
    match: [/^https?:\/\/.+/, "Please provide a valid URL"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
tournamentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Tournament", tournamentSchema);
