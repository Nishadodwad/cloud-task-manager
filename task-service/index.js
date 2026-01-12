const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Task DB connected"))
  .catch(err => console.log(err));

const TaskSchema = new mongoose.Schema({
  title: String,
  username: String
});

const Task = mongoose.model("Task", TaskSchema);

// CREATE
app.post("/tasks", async (req, res) => {
  await new Task(req.body).save();
  res.json({ message: "Task created" });
});

// READ
app.get("/tasks/:username", async (req, res) => {
  const tasks = await Task.find({ username: req.params.username });
  res.json(tasks);
});

// UPDATE
app.put("/tasks/:id", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, { title: req.body.title });
  res.json({ message: "Task updated" });
});

// DELETE
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

app.listen(5002, () =>
  console.log("Task Service running on port 5002")
);
