import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

function Notes() {
  const context = useContext(NoteContext);
  const { notes, deleteNote, loading, fetchNoteById } = context;
  const [currentNote, setCurrentNote] = useState(null); // State for the note being edited

  const handleEdit = async (note) => {
    const fetchedNote = await fetchNoteById(note._id); // Fetch note by ID
    if (fetchedNote) {
      setCurrentNote(fetchedNote); // Set the fetched note for editing
    }
  };

  return (
    <>
      <AddNote currentNote={currentNote} setCurrentNote={setCurrentNote} />
      {loading ? (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row my-1">
          <h2>Your Notes</h2>
          {notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                note={note}
                deleteNote={deleteNote}
                onEdit={() => handleEdit(note)} // Pass note to handleEdit
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default Notes;
