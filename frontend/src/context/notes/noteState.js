import { React, useState, useEffect } from "react";
import axios from "axios"; // Import axios
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const host = "http://localhost:3001"; // Ensure this matches your backend URL
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdlNGUyMDc1MTY4YjQxMmNhNzJkZWQzIn0sImlhdCI6MTc0MzQyNzg5M30.qh33mq6jttXChkEeN2gAUIbDp2vMHJ1tzj10nIP68uA"; // Replace with a valid token

  // Fetch all notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${host}/api/notes/fetchAllNotes`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch notes:",
        error.response?.statusText || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch a note by ID
  const fetchNoteById = async (id) => {
    try {
      const response = await axios.get(`${host}/api/notes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Failed to fetch note by ID:",
        error.response?.statusText || error.message
      );
      return null;
    }
  };

  // Add a note
  const addNote = async (title, content, tags) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${host}/api/notes/addnote`,
        { title, content, tags },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error(
        "Failed to add note:",
        error.response?.statusText || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${host}/api/notes/deletenote/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error(
        "Failed to delete note:",
        error.response?.statusText || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Edit a note
  const onEdit = async (id, title, content, tags) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${host}/api/notes/editNote/${id}`,
        { title, content, tags },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      const updatedNote = response.data;
      setNotes(
        notes.map((note) =>
          note._id === id ? { ...note, ...updatedNote } : note
        )
      ); // Merge updated note
    } catch (error) {
      console.error(
        "Failed to edit note:",
        error.response?.statusText || error.message
      );
    } finally {
      fetchNotes();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, onEdit, fetchNoteById, loading }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
