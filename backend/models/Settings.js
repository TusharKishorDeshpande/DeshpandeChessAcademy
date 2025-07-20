const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  emailNotifications: {
    type: Boolean,
    default: true,
  },
  notificationEmails: [
    {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
  ],
  autoReply: {
    enabled: {
      type: Boolean,
      default: false,
    },
    subject: {
      type: String,
      default: "Thank you for contacting us",
    },
    message: {
      type: String,
      default: "Thank you for your message. We will get back to you soon.",
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
settingsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Settings", settingsSchema);
