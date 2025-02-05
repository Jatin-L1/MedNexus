const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  responderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending","inProgress","resolved"], default: "pending" },
  patientLocation: { type: { lat: Number, lng: Number }, required: true },
  responderLocation: { type: { lat: Number, lng: Number } ,default: null},
  severity: { type: String,enum:["normal","moderate","critical"] ,default: "normal" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Emergency", emergencySchema);

