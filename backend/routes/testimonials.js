const express = require("express");
const Testimonial = require("../models/Testimonial");
const auth = require("../middleware/auth");

const router = express.Router();

// @desc    Get all approved testimonials (public)
// @route   GET /api/testimonials
// @access  Public
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true }).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get all testimonials (admin)
// @route   GET /api/testimonials/admin
// @access  Private
router.get("/admin", auth, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Submit testimonial
// @route   POST /api/testimonials
// @access  Public
router.post("/", async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();

    res.status(201).json({
      success: true,
      data: testimonial,
      message:
        "Testimonial submitted successfully. It will be reviewed before publishing.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Approve testimonial
// @route   PATCH /api/testimonials/:id/approve
// @access  Private
router.patch("/:id/approve", auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isApproved: !req.body.isApproved },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
