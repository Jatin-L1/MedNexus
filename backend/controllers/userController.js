const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const SECRET_KEY = "idk"; // Replace with a secure secret key

// User Registration

exports.register = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      role, 
      specialisation, 
      licenseNo, 
      yearsOfExperience,
      coverImage 
    } = req.body;

   
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      specialisation,
      licenseNo,
      yearsOfExperience,
      coverImage: coverImage || '', // Use uploaded image URL or empty string

      // ! For verification purpose in the dashboard
      isVerifiedDoctor: ( role != "patient" ? "pending" : "nil" )
    });

    await newUser.save();

    res.status(201).json({ 
      message: "User registered successfully!", 
      data: { 
        name: newUser.name, 
        email: newUser.email, 
        role: newUser.role 
      } 
    });

  } catch (error) {
    console.error("Registration error:", {
      message: error.message,
      stack: error.stack,
      body: req.body
    });

    res.status(500).json({ 
      error: "Internal server error during registration",
      details: error.message 
    });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful!", user: { id: user._id, name: user.name, email: user.email, role: user.role,specialisation:user.specialisation,licenseNo:user.licenseNo,yearsOfExperience:user.yearsOfExperience,token } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Toggle Active Status (For Doctors)
exports.toggleActive = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!["doctor", "nurse", "ambulance"].includes(user.role)) {
      return res.status(403).json({ error: "Only doctors, nurses, or ambulance staff can toggle active status." });
    }

    user.status = !user.status;
    await user.save();

    res.json({ message: "Status updated!", status: user.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
