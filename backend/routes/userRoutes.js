const express = require("express");
const { register, login, toggleActive } = require("../controllers/userController");
const upload = require("../middlewares/multer");
const { uploadCloudnary } = require("../Cloudnary");

const router = express.Router();

// Separate routes for registration and file upload
router.post("/register", register);
router.post("/login", login);
router.post("/toggle-active", toggleActive);
router.post('/upload', upload.single('coverImage'), async (req, res) => {
  try {
    // Handle single file upload to Cloudinary
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { path: localFilePath } = req.file;
    const uploadResult = await uploadCloudnary(localFilePath);

    if (!uploadResult) {
      return res.status(500).json({ error: "Failed to upload image" });
    }

    // Return the uploaded image URL
    res.status(200).json({ 
      message: "File uploaded successfully", 
      url: uploadResult.secure_url 
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Internal server error during upload" });
  }
});

module.exports = router;