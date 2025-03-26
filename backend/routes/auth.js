const User = require("../models/User");
const router = require("express").Router();

const {
  loginUser,
  registerUser,
  fetchUser,
} = require("../controllers/authController");

// Create a user using POST request "api/auth" doesn't require auth
router.post("/", registerUser);

router.post(
  "/login",
  loginUser // Validation will now be handled in the controller
);

// Get loggedin user details using POST "api/auth/getuser" login required
router.post("/getuser", fetchUser);

module.exports = router;
