const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor","nurse","ambulance"], required: true },
  specialisation: { type: String }, // Only applies to doctors
  status: { type: Boolean, default:true}, // Only applies to responders
  carNo:{type:String,default:null}, // Only applies to ambulance
});

module.exports = mongoose.model("User", userSchema);
