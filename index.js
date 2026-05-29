const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 MongoDB connect
mongoose.connect("mongodb+srv://botghost:<botghost25>@buildcatalog.79c33vp.mongodb.net/?appName=buildcatalog");

// 📦 Schema
const Build = mongoose.model("Build", {
  name: String,
  description: String,
  code: String,
  author: String,
  createdAt: Date
});


// ➕ ADD BUILD
app.post("/addbuild", async (req, res) => {
  const build = new Build({
    name: req.body.name,
    description: req.body.description,
    code: req.body.code,
    author: req.body.author,
    createdAt: new Date()
  });

  await build.save();
  res.json({ success: true, build });
});


// 🔎 SEARCH BUILD
app.get("/searchbuild", async (req, res) => {
  const query = req.query.q;

  const results = await Build.find({
    name: { $regex: query, $options: "i" }
  });

  res.json(results);
});


// ❌ REMOVE BUILD
app.delete("/removebuild", async (req, res) => {
  await Build.deleteOne({ name: req.body.name });
  res.json({ success: true });
});


// 🚀 START SERVER
app.listen(3000, () => {
  console.log("API running");
});
