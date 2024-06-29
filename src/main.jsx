import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LocationProvider } from "./context/context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LocationProvider>
    <App />
  </LocationProvider>
);
