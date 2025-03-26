const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const handleValidationErrors = require("../utils/errorHandler");
const { validateLoginEmail,validatePassword,validateConfirmPassword,validateUsername,} = require("../utils/validators");
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

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
      expiresIn: JWT_EXPIRATION,
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
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      authToken,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to login", details: error.message });
  }
};

const fetchUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch user details", details: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  fetchUser,
};
