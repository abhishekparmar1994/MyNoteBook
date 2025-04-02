const User = require("../models/User");
const router = require("express").Router();
const middlewareFetchUser = require("../middleware/fetchuser");
const { loginUser, registerUser, getAllUser,logoutUser} = require("../controllers/authController");

// Create a user using POST request "api/auth" doesn't require auth
router.post("/", registerUser);

// Login a user using POST request
router.post( "/login",loginUser);

// Get a user using POST request 
router.post( "/getUser", middlewareFetchUser,getAllUser);
// Logout a user
router.post("/logout", middlewareFetchUser, logoutUser);

module.exports = router;
