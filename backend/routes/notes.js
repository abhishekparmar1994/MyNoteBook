const router = require("express").Router();
const middlewareFetchUser = require("../middleware/fetchuser");
const {
    fetchAllNotes,
    addNote,
    editNote,
    deleteNote,
} = require("../controllers/notesController");
const Note = require('../models/Notes');

// Route 1: Get all the notes GET "/api/notes/fetchAllNotes". Login required
router.get("/fetchAllNotes", middlewareFetchUser, fetchAllNotes);

// Route 2: Add a new note POST "/api/notes/addNote". Login required
router.post("/addNote", middlewareFetchUser, addNote);

// Route 3: Edit an existing note PUT "/api/notes/editNote/:id". Login required
router.put("/editNote/:id", middlewareFetchUser, editNote);

// Route 4: Delete a note DELETE "/api/notes/deleteNote/:id". Login required
router.delete("/deleteNote/:id", middlewareFetchUser, deleteNote);

// Route 5: Get a note by ID GET "/api/notes/:id". Login required
router.get('/:id', middlewareFetchUser, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Unauthorized access" });
        }
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
