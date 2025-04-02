const express = require("express");
const { isTokenBlacklisted } = require("../controllers/authController");
const router = express.Router();

// Example protected route
router.get("/protected-route", isTokenBlacklisted, (req, res) => {
  res.status(200).json({ message: "Access granted to protected route." });
});

// ...apply isTokenBlacklisted to other protected routes...

module.exports = router;
