const express = require("express");
const path = require("path");

const app = express();
const PORT = 3003;

// Serve static frontend files correctly
app.use(express.static(path.join(__dirname, "../frontend")));

// Default route → login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.listen(PORT, () => {
  console.log(`Frontend running on http://localhost:${PORT}`);
});
