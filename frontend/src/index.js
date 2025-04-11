// Essential React imports
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Router for handling navigation
import { BrowserRouter as Router } from "react-router-dom";
// Bootstrap styling
import "bootstrap/dist/css/bootstrap.min.css";

// Create root element for React application
const root = ReactDOM.createRoot(document.getElementById("root"));
// Render the app within StrictMode and Router
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// Monitor application performance
reportWebVitals();
