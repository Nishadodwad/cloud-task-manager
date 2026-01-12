const express = require("express");
const path = require("path");

const app = express();

// 🔑 IMPORTANT: Render provides PORT
const PORT = process.env.PORT || 3003;

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Default route → login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});
