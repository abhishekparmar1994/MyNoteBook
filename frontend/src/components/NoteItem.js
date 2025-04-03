import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const NoteItem = ({ note, deleteNote, onEdit }) => {
  const handleDelete = () => {
    deleteNote(note._id); // Call deleteNote with the note's id
  };

  const handleEdit = () => {
    onEdit(note); // Pass the entire note object
  };

  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.content}</p>
          <div className="mb-2">
            {note.tags &&
              note.tags.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-1">
                  {tag}
                </span>
              ))}
          </div>
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
