const mongoose = require("mongoose");
const Emergency = require("../models/Emergency");
const User = require("../models/User");


// Trigger emergency (for patient)
exports.triggerEmergency = async (req, res) => {
  try {
    const { patientId, location, severity } = req.body;

    // Ensure patientId is an ObjectId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ error: "Invalid patient ID" });
    }


    // ✅ Create emergency record
    const emergency = new Emergency({
      patientId: new mongoose.Types.ObjectId(patientId),
      patientLocation: location,
      severity: severity,
      createdAt: new Date(),
    });
    await emergency.save();

    res.json({ message: "Emergency triggered" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// Accept emergency request (Doctor accepts emergency)
exports.acceptEmergency = async (req, res) => {
    const { responderId, emergencyId, patientId, patientLocation, responderLocation } = req.body;
  
    try {
      const emergencyRequest = await Emergency.findById(emergencyId).populate('patientId');
      const responder = await User.findById(responderId);
  
      if (!responder || !emergencyRequest) {
        return res.status(400).json({ error: "Invalid doctor or emergency request" });
      }
  
      emergencyRequest.status = "inProgress";
      emergencyRequest.responderId = responderId;
      emergencyRequest.responderLocation = responderLocation; 
      emergencyRequest.patientLocation = patientLocation;
      emergencyRequest.patientId = patientId;
      emergencyRequest.responderName = responder.name;
  
      await emergencyRequest.save();
  
      res.status(200).json({
        message: "Emergency accepted successfully!",
        responderInfo: {
          name: responder.name,
          location: responderLocation,
        },
      });
    } catch (error) {
      console.error("Error processing emergency:", error);  // Log full error for debugging
      res.status(500).json({ error: "Failed to accept emergency", details: error.message });
    }
  };
  




  
  
// Express handler to get accepted emergencies

exports.getAcceptedEmergencies = async (req, res) => {
    try {
      // Fetch all accepted emergencies and populate the doctor and patient data
      const acceptedEmergencies = await Emergency.find({ status: 'inProgress' })
        .populate('patientId', 'name location')  // Populate patient data (name, location)
        .populate('responderId', 'name location role licenseNo coverImage'); // Populate doctor data (name, location)
  
      if (!acceptedEmergencies || acceptedEmergencies.length === 0) {
        return res.status(404).json({ error: "No accepted emergencies found" });
      }
  
      // Send the list of accepted emergencies with doctor and patient info
      res.status(200).json(acceptedEmergencies);
    } catch (error) {
      console.error("Error fetching accepted emergencies:", error);
      res.status(500).json({ error: "Failed to fetch accepted emergencies" });
    }
  };

  exports.updateDoctorLocation = async (req, res) => {
    try {
      const { responderId, location, emergencyId } = req.body;
  
      console.log(`Updating doctor location: ${responderId}`, location);
  
      // ✅ Correct database update
      const result = await Emergency.updateOne(
        { _id: emergencyId, responderId: responderId, status: "inProgress" },
        {
          $set: {
            "responderLocation": { lat: location.lat, lng: location.lng }
          }
        }
      );
  
      if (result.matchedCount === 0) {
        // ✅ Only send response once
        return res.status(404).json({ message: "Emergency not found or not accepted." });
      }
  
      // ✅ Success response
      res.status(200).json({ message: "Location updated successfully." });
  
    } catch (error) {
      console.error("❌ Error updating doctor's location:", error);
  
      // ✅ Ensure only one response is sent in case of error
      if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error." });
      }
    }
  };
  

  
  exports.getEmergencies = async (req, res) => {
    try {
      const emergencies = await Emergency.find({  status: { $in: [ "pending","inProgress","resolved"] }}).populate("patientId");
      res.json(emergencies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  

// exports.getEmergencies = async (req, res) => {
//   try {
//     const emergencies = await Emergency.find({  status: { $in: ["accepted", "pending"] }}).populate("patientId");
//     res.json(emergencies);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// }