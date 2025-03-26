const router = require("express").Router();
const middlewareFetchUser = require("../middleware/fetchuser");
const { fetchAllNotes, addNote, editNote, deleteNote } = require("../controllers/notesController");

// Route 1: Get all the notes GET "/api/notes/fetchAllNotes". Login required
router.get("/fetchAllNotes", middlewareFetchUser, fetchAllNotes);

// Route 2: Add a new note POST "/api/notes/addNote". Login required
router.post("/addNote", middlewareFetchUser, addNote);

// Route 3: Edit an existing note PUT "/api/notes/editNote/:id". Login required
router.put("/editNote/:id", middlewareFetchUser, editNote);

// Route 4: Delete a note DELETE "/api/notes/deleteNote/:id". Login required
router.delete("/deleteNote/:id", middlewareFetchUser, deleteNote);

module.exports = router;
