import express from "express";
import fetch from "node-fetch"; // optional, not used below
import path from "path";
import fs from "fs";
import https from "https";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
const __dirname = path.resolve(); // For ES module compatibility

// Custom HTTPS agent
let httpsAgent;

try {
  const caCert = fs.readFileSync(path.join(__dirname, "certs", "my-private-root-ca.pem"));
  httpsAgent = new https.Agent({ ca: caCert });
  console.log("✅ Loaded custom CA certificate for SSL verification.");
} catch (err) {
  console.warn("⚠️ Failed to load custom CA cert. Falling back to insecure SSL (dev only).");
  httpsAgent = new https.Agent({ rejectUnauthorized: false });
}

// Enable CORS
app.use(cors({
  origin: "*", // Adjust as needed
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve React static files
app.use(express.static(path.join(__dirname, "build")));

// === Routes ===

// Customer
app.post("/customer/customerDetails", async (req, res) => {
  try {
    const data = req.body;

    const response = await axios.post(
      "https://backend.dev.hpm.com/customer/customerDetails",
      data,
      { httpsAgent }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("❌ Error from /customer/customerDetails:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Driver
app.post("/driver/driverDetails", async (req, res) => {
  try {
    const data = req.body;

    const response = await axios.post(
      "https://backend.dev.hpm.com/driver/driverDetails",
      data,
      { httpsAgent }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("❌ Error from /driver/driverDetails:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Catch-all to serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 BFF server running on http://localhost:${PORT}`);
});
