import { React, useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNote = ({ currentNote, setCurrentNote, showAlert }) => {
  const context = useContext(NoteContext);
  const { addNote, onEdit } = context;

  const [note, setNote] = useState({
    _id: "",
    title: "",
    content: "",
    tags: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentNote) {
      setNote({
        ...currentNote,
        tags: currentNote.tags ? currentNote.tags.join(", ") : "",
      });
    }
  }, [currentNote]);

  const validateForm = () => {
    const newErrors = {};
    if (!note.title.trim()) newErrors.title = "Title is required";
    else if (note.title.trim().length < 3) newErrors.title = "Title must be at least 3 characters";
    
    if (!note.content.trim()) newErrors.content = "Content is required";
    else if (note.content.trim().length < 5) newErrors.content = "Content must be at least 5 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const tagsArray = note.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      if (note._id) {
        await onEdit(note._id, note.title, note.content, tagsArray);
        showAlert("Note updated successfully", "success");
      } else {
        await addNote(note.title, note.content, tagsArray);
        showAlert("Note added successfully", "success");
      }
      
      // Reset form
      setNote({ _id: "", title: "", content: "", tags: "" });
      setErrors({});
      setCurrentNote(null);
    } catch (error) {
      showAlert(error.message || "Failed to save note", "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleCancel = () => {
    setNote({ _id: "", title: "", content: "", tags: "" });
    setErrors({});
    setCurrentNote(null);
  };

  return (
    <div className="my-4">
      <h2>{note._id ? "Edit Note" : "Add New Note"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="_id" value={note._id} />
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            id="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Enter note title"
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content <span className="text-danger">*</span>
          </label>
          <textarea
            className={`form-control ${errors.content ? "is-invalid" : ""}`}
            name="content"
            id="content"
            rows="4"
            value={note.content}
            onChange={handleChange}
            placeholder="Enter note content"
          ></textarea>
          {errors.content && (
            <div className="invalid-feedback">{errors.content}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            className="form-control"
            id="tags"
            value={note.tags}
            onChange={handleChange}
            placeholder="Enter tags separated by commas"
          />
        </div>
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : note._id ? (
              "Update Note"
            ) : (
              "Add Note"
            )}
          </button>
          {note._id && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddNote;
