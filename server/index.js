import express from "express";
import fetch from "node-fetch"; // if you need node-fetch
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import axios from 'axios'; 

// Enable CORS
app.use(cors({
    origin: "*", // Allow requests from this origin
    methods: ["GET", "POST"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type"] // Specify allowed headers
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Proxy route to the backend
app.post('/customer/customerDetails', async (req, res) => {
    try {
      const data = req.body;
      const response = await axios.post('https://backend.hyderabad-packers-movers.in/customer/customerDetails', data);
  
      // Send the JSON response from Spring Boot to the frontend
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error communicating with Spring Boot:", error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Start the BFF server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`BFF server running on http://localhost:${PORT}`);
});
