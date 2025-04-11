import { React, useState, useEffect, useCallback } from "react";
import axios from "axios";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('auth-token')); // Get token from localStorage

  const host = "http://localhost:3000"; // Updated to match backend port

  // Update token
  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('auth-token', newToken);
    } else {
      localStorage.removeItem('auth-token');
    }
  };

  // Fetch all notes
  const fetchNotes = useCallback(async () => {
    if (!token) return; // Don't fetch if no token
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
  }, [token]); // Add token as a dependency since it's used inside the function

  // Fetch a note by ID
  const fetchNoteById = async (id) => {
    if (!token) return null; // Don't fetch if no token
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
    if (!token) return; // Don't add if no token
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
    if (!token) return; // Don't delete if no token
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
    if (!token) return; // Don't edit if no token
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
  }, [fetchNotes, token]); // Re-fetch when token changes

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, onEdit, fetchNoteById, loading, updateToken }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
