const express = require('express');
const fetch = require('node-fetch'); // This will now work with CommonJS
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Proxy Route: Forward the request to the backend API
// app.post("/customer/customerDetails", (req, res) => {
app.post("https://hyderabad-packers-movers.in/customer/customerDetails", (req, res) => {
  const backendUrl = "https://backend.hyderabad-packers-movers.in/customer/customerDetails";

  fetch(backendUrl, {
    method: "POST", // Use POST or GET depending on your backend API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body), // Forward the body of the request
  })
    .then((response) => response.json())
    .then((data) => {
      res.json(data); // Send the response from the backend to the frontend
    })
    .catch((error) => {
      console.error("Error proxying request:", error);
      res.status(500).json({ message: "Error proxying request to backend" });
    });
});

// Serve static files from the React app
app.use(express.static("client/build"));

// Catch-all handler to serve the React app for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
