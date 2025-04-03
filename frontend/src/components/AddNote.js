import { React, useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNote = ({ currentNote, setCurrentNote }) => {
  const context = useContext(NoteContext);
  const { addNote, onEdit } = context;

  const [note, setNote] = useState({
    _id: "",
    title: "",
    content: "",
    tags: "",
  }); // Use 'tags' as a comma-separated string
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentNote) {
      setNote({
        ...currentNote,
        tags: currentNote.tags ? currentNote.tags.join(", ") : "", // Convert tags array to comma-separated string
      });
    }
  }, [currentNote]);

  const validateForm = () => {
    const newErrors = {};
    if (!note.title.trim()) newErrors.title = "Title is required.";
    if (!note.content.trim()) newErrors.content = "Content is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const tagsArray = note.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag); // Convert string to array
    if (note._id) {
      onEdit(note._id, note.title, note.content, tagsArray);
    } else {
      addNote(note.title, note.content, tagsArray);
    }
    setNote({ _id: "", title: "", content: "", tags: "" }); // Reset form
    setErrors({});
    setCurrentNote(null); // Clear currentNote after submission
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container">
        <h2>{note._id ? "Edit Note" : "Add Note"}</h2>
        <form>
          <input type="hidden" name="_id" value={note._id} />
          <div className="mb-3">
            <label htmlFor="title" className="form-label font-weight-bold">
              Note Title
            </label>
            <input
              type="text"
              name="title"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              id="title"
              value={note.title}
              onChange={handleChange}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label font-weight-bold">
              Note Content
            </label>
            <textarea
              className={`form-control ${errors.content ? "is-invalid" : ""}`}
              name="content"
              id="content"
              value={note.content}
              onChange={handleChange}
            ></textarea>
            {errors.content && (
              <div className="invalid-feedback">{errors.content}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label font-weight-bold">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              className="form-control"
              id="tags"
              value={note.tags}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            {note._id ? "Update Note" : "Add Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
