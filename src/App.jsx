import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/home";
import EditorPage from "./components/editor-page";
import { ThemeProvider } from "./context/ThemeContext";
import { StatusProvider } from "./context/StatusContext";
import StatusPill from "./components/StatusPill";

const App = () => {
  return (
    <ThemeProvider>
      <StatusProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:roomId" element={<EditorPage />} />
        </Routes>
        <StatusPill />
      </StatusProvider>
    </ThemeProvider>
  );
};

export default App;
