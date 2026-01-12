const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Auth DB connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// Register
app.post("/register", async (req, res) => {
  const existing = await User.findOne({ username: req.body.username });
  if (existing) return res.json({ message: "User already exists" });

  await new User(req.body).save();
  res.json({ message: "Registration successful" });
});

// Login
app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.json({ success: false });

  res.json({ success: true, username: user.username });
});

app.listen(5001, () =>
  console.log("Auth Service running on port 5001")
);
