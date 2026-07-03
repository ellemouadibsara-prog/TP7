require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static("public"));

const ticketRoutes = require("./routes/tickets");

app.use("/api/tickets", ticketRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API is running"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});