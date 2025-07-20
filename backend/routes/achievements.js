const express = require("express");
const router = express.Router();
const Achievement = require("../models/Achievement");
const auth = require("../middleware/auth");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Configure Cloudinary (if not already configured)
if (!cloudinary.config().cloud_name) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (buffer, folder = "achievements") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: folder,
          transformation: [
            { width: 450, height: 600, crop: "fill", quality: "auto" },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      )
      .end(buffer);
  });
};

// @route   GET /api/achievements
// @desc    Get all active achievements (public)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const achievements = await Achievement.find({ isActive: true })
      .sort({ date: -1 })
      .select("-__v");

    res.json({
      success: true,
      data: achievements,
    });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching achievements",
    });
  }
});

// @route   GET /api/achievements/admin
// @desc    Get all achievements for admin (including inactive)
// @access  Private (Admin only)
router.get("/admin", auth, async (req, res) => {
  try {
    const achievements = await Achievement.find({})
      .sort({ createdAt: -1 })
      .select("-__v");

    res.json({
      success: true,
      data: achievements,
    });
  } catch (error) {
    console.error("Error fetching achievements for admin:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching achievements",
    });
  }
});

// @route   GET /api/achievements/:id
// @desc    Get single achievement
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    // If not admin, only return active achievements
    if (!achievement.isActive && !req.user) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    console.error("Error fetching achievement:", error);
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error while fetching achievement",
    });
  }
});

// @route   POST /api/achievements
// @desc    Create new achievement
// @access  Private (Admin only)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      studentName,
      description,
      date,
      location,
      ratingChange,
      tags,
      isActive,
    } = req.body;

    // Validate required fields
    if (!title || !studentName || !description || !date || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
        errors: {
          title: !title ? "Title is required" : "",
          studentName: !studentName ? "Student name is required" : "",
          description: !description ? "Description is required" : "",
          date: !date ? "Date is required" : "",
          location: !location ? "Location is required" : "",
        },
      });
    }

    // Parse tags if provided as string
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      } catch (e) {
        parsedTags =
          typeof tags === "string"
            ? tags.split(",").map((tag) => tag.trim())
            : tags;
      }
    }

    const achievementData = {
      title: title.trim(),
      studentName: studentName.trim(),
      description: description.trim(),
      date: new Date(date),
      location: location.trim(),
      ratingChange: ratingChange ? ratingChange.trim() : "",
      tags: parsedTags,
      isActive:
        isActive !== undefined
          ? isActive === "true" || isActive === true
          : true,
    };

    // Handle image upload if provided
    if (req.file) {
      try {
        const imageUrl = await uploadToCloudinary(
          req.file.buffer,
          "achievements"
        );
        achievementData.image = imageUrl;
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return res.status(400).json({
          success: false,
          message: "Failed to upload image",
        });
      }
    }

    const achievement = new Achievement(achievementData);
    await achievement.save();

    res.status(201).json({
      success: true,
      data: achievement,
      message: "Achievement created successfully",
    });
  } catch (error) {
    console.error("Error creating achievement:", error);

    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating achievement",
    });
  }
});

// @route   PUT /api/achievements/:id
// @desc    Update achievement
// @access  Private (Admin only)
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    const {
      title,
      studentName,
      description,
      date,
      location,
      ratingChange,
      tags,
      isActive,
    } = req.body;

    // Parse tags if provided as string
    let parsedTags = achievement.tags;
    if (tags !== undefined) {
      try {
        parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      } catch (e) {
        parsedTags =
          typeof tags === "string"
            ? tags.split(",").map((tag) => tag.trim())
            : tags;
      }
    }

    // Update fields
    if (title !== undefined) achievement.title = title.trim();
    if (studentName !== undefined) achievement.studentName = studentName.trim();
    if (description !== undefined) achievement.description = description.trim();
    if (date !== undefined) achievement.date = new Date(date);
    if (location !== undefined) achievement.location = location.trim();
    if (ratingChange !== undefined)
      achievement.ratingChange = ratingChange.trim();
    if (tags !== undefined) achievement.tags = parsedTags;
    if (isActive !== undefined)
      achievement.isActive = isActive === "true" || isActive === true;

    // Handle image upload if provided
    if (req.file) {
      try {
        const imageUrl = await uploadToCloudinary(
          req.file.buffer,
          "achievements"
        );
        achievement.image = imageUrl;
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return res.status(400).json({
          success: false,
          message: "Failed to upload image",
        });
      }
    }

    await achievement.save();

    res.json({
      success: true,
      data: achievement,
      message: "Achievement updated successfully",
    });
  } catch (error) {
    console.error("Error updating achievement:", error);

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating achievement",
    });
  }
});

// @route   DELETE /api/achievements/:id
// @desc    Delete achievement
// @access  Private (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    await Achievement.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting achievement:", error);

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while deleting achievement",
    });
  }
});

module.exports = router;
