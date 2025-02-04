// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const axios = require("axios");
require("./websocket"); 

const app = express();
app.use(express.json());

// Enable CORS for frontend (http://localhost:5173)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/emergency", require("./routes/emergencyRoutes"));

app.get("/api/directions", async (req, res) => {
    const { start, end } = req.query;
    const API_KEY = process.env.MAPBOX_API_KEY;

    if (!start || !end) {
        return res.status(400).json({ error: "Missing start or end parameters" });
    }

    // Make request to Mapbox API
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?access_token=${API_KEY}&geometries=geojson`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching route:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch directions" });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
