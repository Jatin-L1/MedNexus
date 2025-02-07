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

// * userID = "_id" in MongoDB
// * type = "isVerifiedDoctor" in MongoDB
router.post("/professional/set/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { type } = req.body;

    console.log(req);

    if (!["pending", "approved", "rejected"].includes(type)) {
      return res.status(400).json({ message: "Invalid type parameter" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isVerifiedDoctor: type },
      { new: true } // ! Returns updated document back to us
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User verification status updated", user: updatedUser });

  } catch (error) {
    console.error("Error updating user verification status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
