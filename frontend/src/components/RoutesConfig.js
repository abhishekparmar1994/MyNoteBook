import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import NoteState from "../context/notes/noteState";

const RoutesConfig = () => {
  return (
    <main className="main-content" >
      <div className="container">
        <NoteState>
          <Routes>
            <Route exact path="/" element={ <Home></Home> }/>
            <Route exact path="/about" element={ <About></About> }/>
          </Routes>
        </NoteState>
      </div>
    </main>
  );
};

export default RoutesConfig;
