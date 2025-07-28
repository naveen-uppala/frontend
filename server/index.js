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

// Load the private root CA certificate
const httpsAgent = new https.Agent({
  ca: fs.readFileSync(path.join(__dirname, "certs", "my-private-root-ca.pem")),
});

// Enable CORS
app.use(cors({
  origin: "*", // Adjust as needed for production
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "build")));

// Proxy route to backend
app.post("/customer/customerDetails", async (req, res) => {
  try {
    const data = req.body;

    // Secure HTTPS request to backend Spring Boot app
    const response = await axios.post(
      "https://backend-dev-hpm.com/customer/customerDetails",
      data,
      { httpsAgent } // Use custom CA trust
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error communicating with Spring Boot:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Catch-all to serve React app for non-API requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the Express server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`BFF server running on http://localhost:${PORT}`);
});
