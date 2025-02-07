const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/professional/:type", async (req, res) => {
  try {
    const { type } = req.params;

    // ? Checks if the params are correct and are following
    // ? `userSchmema.isVerifiedDoctor` must be followed
    // ? ["pending", "approved", "rejected", "nil"] :-)
    if (!["pending", "approved", "rejected"].includes(type)) {
      return res.status(400).json({ message: "Invalid type parameter" });
    }

    // * Gets users with the given verification type from MongoDB
    const professionals = await User.find({ isVerifiedDoctor: type });

    res.status(200).json(professionals);
  } catch (error) {
    console.error("Error fetching professionals:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;