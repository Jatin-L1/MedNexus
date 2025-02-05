const express = require("express");
const { triggerEmergency, acceptEmergency, updateDoctorLocation ,getAcceptedEmergencies, getEmergencies} = require("../controllers/emergencyController");
const Emergency = require('../models/Emergency');
const router = express.Router();

// Trigger emergency (for patient)
router.post("/trigger", triggerEmergency);

// Accept emergency (doctor accepts)
router.post("/accept", acceptEmergency);

// Update doctor's location during emergency
router.post("/update-location", updateDoctorLocation);

router.get("/requests",getEmergencies);


router.get("/accepted", getAcceptedEmergencies);


router.post('/doctor-arrival', async (req, res) => {
    const { emergencyId, status } = req.body;
  
    try {
      // Find the emergency by ID and update its status
      const emergency = await Emergency.findByIdAndUpdate(
        emergencyId,
        { status: status }, // Update the status field to 'resolved'
        { new: true } // Return the updated document
      );
  
      if (!emergency) {
        return res.status(404).json({ message: "Emergency not found." });
      }
  
      res.status(200).json({ message: "Emergency status updated.", emergency });
    } catch (error) {
      console.error("Error updating emergency status:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  });
  


module.exports = router;
