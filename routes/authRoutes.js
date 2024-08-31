const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Create this user model for authentication

router.post("/login", async (req, res) => {
  console.log(req.body.username);
  const { username, password } = req.body;
  const user = await User.find({ username: req.body.username });
  if (!user) return res.status(404).json({ message: "User not found" });

  //const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
});

module.exports = router;
