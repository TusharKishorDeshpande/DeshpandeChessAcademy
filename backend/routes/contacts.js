const express = require("express");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

const router = express.Router();

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Create contact (public endpoint for contact form)
// @route   POST /api/contacts
// @access  Public
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    res.status(201).json({
      success: true,
      data: contact,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Mark contact as read
// @route   PATCH /api/contacts/:id/read
// @access  Private
router.patch("/:id/read", auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
