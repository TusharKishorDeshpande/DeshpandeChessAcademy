const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Achievement title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      maxlength: [100, "Student name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    image: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: [true, "Achievement date is required"],
      default: Date.now,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },
    ratingChange: {
      type: String,
      default: "",
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [50, "Tag cannot exceed 50 characters"],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
achievementSchema.index({ date: -1 });
achievementSchema.index({ isActive: 1 });
achievementSchema.index({ tags: 1 });

module.exports = mongoose.model("Achievement", achievementSchema);
