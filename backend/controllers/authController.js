const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const handleValidationErrors = require("../utils/errorHandler");
const { validateLoginEmail,validatePassword,validateConfirmPassword,validateUsername,} = require("../utils/validators");
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
const blacklist = require("../utils/tokenBlacklist"); // Import blacklist utility

// Controller to handle user registration
const registerUser = async (req, res) => {
  try {
    await Promise.all(
      [
        ...validateUsername,
        ...validateLoginEmail,
        ...validatePassword,
        ...validateConfirmPassword,
      ].map((validator) => validator.run(req))
    );

    const errorResponse = handleValidationErrors(req, res);
    if (errorResponse) return errorResponse;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };
      
    const authToken = jwt.sign(data, JWT_SECRET, {
      expiresIn:'1d',
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      authToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
};

// Controller to handle user login
const loginUser = async (req, res) => {
  await Promise.all(
    [...validateLoginEmail, ...validatePassword].map((validator) =>
      validator.run(req)
    )
  );
  const errorResponse = handleValidationErrors(req, res);
  if (errorResponse) return errorResponse;

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate a new token
    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET); // Removed expiresIn option

    // Add session metadata (e.g., IP address, user agent)
    const session = {
      token: authToken,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      createdAt: new Date(),
    };

    // Save the session to the user's record
    user.sessions = user.sessions || [];
    user.sessions.push(session);
    await user.save();

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        session:session
      },
      authToken,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to login", details: error.message,session:session });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user details", details: error.message });
  }
};

// Controller to handle user logout
const logoutUser = async (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(400).json({ error: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the token is already blacklisted
    if (blacklist.has(token)) {
      return res.status(400).json({ error: "Token is already invalidated." });
    }

    // Remove the session with the matching token
    user.sessions = user.sessions.filter((session) => session.token !== token);
    await user.save();
    
    // Add the token to the blacklist
    blacklist.add(token);

    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to logout.", details: error.message });
  }
};

// Middleware to check if token is blacklisted
const isTokenBlacklisted = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }
  if (blacklist.has(token)) {
    return res.status(401).json({ error: "Token is invalidated. Please log in again." });
  }
  next();
};

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  logoutUser,
  isTokenBlacklisted, // Export the middleware
};
