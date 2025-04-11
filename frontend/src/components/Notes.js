import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

function Notes({ showAlert }) {
  const context = useContext(NoteContext);
  const { notes, deleteNote, loading, fetchNoteById } = context;
  const [currentNote, setCurrentNote] = useState(null);

  const handleEdit = async (note) => {
    try {
      const fetchedNote = await fetchNoteById(note._id);
      if (fetchedNote) {
        setCurrentNote(fetchedNote);
        showAlert("Note loaded for editing", "info");
      } else {
        showAlert("Failed to fetch note details", "danger");
      }
    } catch (err) {
      showAlert("An error occurred while fetching note details", "danger");
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId);
      showAlert("Note deleted successfully", "success");
    } catch (err) {
      showAlert("Failed to delete note", "danger");
    }
  };

  return (
    <>
      <AddNote currentNote={currentNote} setCurrentNote={setCurrentNote} showAlert={showAlert} />
      {loading ? (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row my-1">
          <h2>Your Notes</h2>
          {notes.length === 0 ? (
            <p className="text-muted">No notes yet. Create one above!</p>
          ) : (
            notes.map((note) => (
              <NoteItem
                key={note._id}
                note={note}
                deleteNote={() => handleDelete(note._id)}
                onEdit={() => handleEdit(note)}
              />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default Notes;
