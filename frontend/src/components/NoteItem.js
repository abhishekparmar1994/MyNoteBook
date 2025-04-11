import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

// NoteItem component displays individual note cards with edit and delete functionality
// Props:
// - note: Object containing note data (title, content, tags, _id)
// - deleteNote: Function to handle note deletion
// - onEdit: Function to handle note editing
const NoteItem = ({ note, deleteNote, onEdit }) => {
  // Handler for note deletion
  const handleDelete = () => {
    deleteNote(note._id);
  };

  // Handler for note editing
  const handleEdit = () => {
    onEdit(note);
  };

  return (
    // Bootstrap grid column for responsive layout
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          {/* Note title and content display */}
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.content}</p>
          {/* Tags section - renders badges for each tag */}
          <div className="mb-2">
            {note.tags &&
              note.tags.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-1">
                  {tag}
                </span>
              ))}
          </div>
          {/* Action icons for delete and edit */}
          <FontAwesomeIcon
            icon={faTrash}
            className="mx-2 text-danger"
            onClick={handleDelete}
          />
          <FontAwesomeIcon
            icon={faEdit}
            className="mx-2 text-primary"
            onClick={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
