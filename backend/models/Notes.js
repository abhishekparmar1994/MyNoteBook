const mongoose = require("mongoose");

// Define the schema for the Notes model
const notesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  tags: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Add default value for the date field
  },
});

// Create the Notes model
module.exports = mongoose.model("Notes", notesSchema);
