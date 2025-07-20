const express = require("express");
const Settings = require("../models/Settings");
const auth = require("../middleware/auth");

const router = express.Router();

// @desc    Get settings
// @route   GET /api/settings
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = new Settings({
        emailNotifications: true,
        notificationEmails: [],
        tournamentNotifications: true,
      });
      await settings.save();
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private
router.put("/", auth, async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }

    await settings.save();

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Update notification emails
// @route   PUT /api/settings/emails
// @access  Private
router.put("/emails", auth, async (req, res) => {
  try {
    const { emails } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    settings.notificationEmails = emails;
    await settings.save();

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Update notification settings
// @route   PUT /api/settings/notifications
// @access  Private
router.put("/notifications", auth, async (req, res) => {
  try {
    const { enabled } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    settings.emailNotifications = enabled;
    await settings.save();

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
