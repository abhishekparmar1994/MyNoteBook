const Notes = require("../models/Notes");
const handleValidationErrors = require("../utils/errorHandler");
const {
  validateTitle,
  validateContent,
  validateTags,
} = require("../utils/validators");

const fetchAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Controller to add a new note
const addNote = async (req, res) => {
  try {
    
    await Promise.all(
      [...validateTitle, ...validateContent, ...validateTags].map((validator) =>
        validator.run(req)
      )
    );
    const errorResponse = handleValidationErrors(req, res); 
    if (errorResponse) return; // Ensure response is returned if validation fails

    const { title, content, tags } = req.body;
    const note = new Notes({
      user: req.user.id,
      title,
      content,
      tags,
    });

    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error("Error in addNote:", error.message); // Log error details
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// Controller to edit a note
const editNote = async (req, res) => {
  try {
    await Promise.all(
      [...validateTitle, ...validateContent, ...validateTags].map((validator) =>
        validator.run(req)
      )
    );
    const errorResponse = handleValidationErrors(req, res);
    if (errorResponse) return; // Ensure response is returned if validation fails
    const { title, content,tags } = req.body;
    const noteId = req.params.id;

    // Check if note exists and belongs to the user
    let note = await Notes.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Update the note
    const updatedNote = await Notes.findByIdAndUpdate(
      noteId,
      { title, content,tags },
      { new: true }
    );

    res.status(200).json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    res.status(500).json({ error: "Failed to update note", details: error.message });
  }
};

// Controller to delete a note
const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    // Check if note exists and belongs to the user
    let note = await Notes.findById(noteId);
    
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Delete the note
    await Notes.findByIdAndDelete(noteId);

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note", details: error.message });
  }
};

module.exports = {
  fetchAllNotes,
  addNote,
  editNote,
  deleteNote,
};
