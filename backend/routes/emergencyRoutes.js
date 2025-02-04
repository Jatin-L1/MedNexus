const express = require("express");
const { triggerEmergency, acceptEmergency, updateDoctorLocation ,getAcceptedEmergencies, getEmergencies} = require("../controllers/emergencyController");

const router = express.Router();

// Trigger emergency (for patient)
router.post("/trigger", triggerEmergency);

// Accept emergency (doctor accepts)
router.post("/accept", acceptEmergency);

// Update doctor's location during emergency
router.post("/update-location", updateDoctorLocation);

router.get("/requests",getEmergencies);


router.get("/accepted", getAcceptedEmergencies);


module.exports = router;
