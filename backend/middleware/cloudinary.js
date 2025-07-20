const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
// The CLOUDINARY_URL environment variable will be automatically used by cloudinary
// No need to manually set cloud_name, api_key, and api_secret

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chess-academy/tournaments",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [
      { width: 800, height: 600, crop: "fill" }, // Changed to 4:3 ratio (800x600)
      { quality: "auto" },
    ],
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

module.exports = { cloudinary, upload };
