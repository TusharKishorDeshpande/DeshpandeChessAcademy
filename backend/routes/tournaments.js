const express = require("express");
const Tournament = require("../models/Tournament");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/cloudinary");

const router = express.Router();

// @desc    Get all tournaments (public)
// @route   GET /api/tournaments
// @access  Public
router.get("/", async (req, res) => {
  try {
    const tournaments = await Tournament.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      data: tournaments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get all tournaments (admin)
// @route   GET /api/tournaments/admin
// @access  Private
router.get("/admin", auth, async (req, res) => {
  try {
    const tournaments = await Tournament.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: tournaments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get single tournament
// @route   GET /api/tournaments/:id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.json({
      success: true,
      data: tournament,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Create tournament
// @route   POST /api/tournaments
// @access  Private
router.post("/", auth, upload.single("banner"), async (req, res) => {
  try {
    const tournamentData = req.body;

    // If file was uploaded, add the Cloudinary URL
    if (req.file) {
      tournamentData.banner = req.file.path;
    }

    const tournament = new Tournament(tournamentData);
    await tournament.save();

    res.status(201).json({
      success: true,
      data: tournament,
    });
  } catch (error) {
    console.error(error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Update tournament
// @route   PUT /api/tournaments/:id
// @access  Private
router.put("/:id", auth, upload.single("banner"), async (req, res) => {
  try {
    const updateData = req.body;

    // If new file was uploaded, add the Cloudinary URL
    if (req.file) {
      updateData.banner = req.file.path;
    }

    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found",
      });
    }

    res.json({
      success: true,
      data: tournament,
    });
  } catch (error) {
    console.error(error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Delete tournament
// @route   DELETE /api/tournaments/:id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.json({
      success: true,
      message: "Tournament deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
