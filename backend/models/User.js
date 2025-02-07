const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor","nurse","ambulance"], required: true },
  specialisation: { type: String }, // Only applies to doctors
  status: { type: Boolean, default:true}, // Only applies to responders
  licenseNo:{type:String}, // Only applies to doctors
  yearsOfExperience:{type:Number}, // Only applies to doctors
  coverImage: { type: String, default: "" }, // To store the image URL
  coverImagePublicId: { type: String, default: "" }, // To store the Cloudinary public ID
  
  // * For verification of professional in dashboard
  // * nil is for normal user, rest for professionals
  isVerifiedDoctor: {
    type: String,
    enum: ["pending", "rejected", "approved", "nil"],
    default: "nil"
  }
});

module.exports = mongoose.model("User", userSchema);
