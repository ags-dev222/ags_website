import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx"; // ✅ Provider
import { AuthProvider } from "./context/AuthProvider.jsx"; // ✅ Correct Import // ✅ AuthProvider
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> 
      <ThemeProvider> 
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
