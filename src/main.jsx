import React from "react";
import ReactDOM from "react-dom/client";
import "./services/i18n.js"; 
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { SearchProvider } from "./context/SearchContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <UserProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </UserProvider>
    
  </React.StrictMode>
);
