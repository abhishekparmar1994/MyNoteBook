const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  currentToken: {
    type: String,
  },
  date: {
    type: Date,
  },
  sessions: [
    {
      token: { type: String, required: true },
      ip: { type: String },
      userAgent: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
