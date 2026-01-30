import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/home";
import AboutPage from "./components/AboutPage";
import EditorPage from "./components/editor-page";
import { ThemeProvider } from "./providers/ThemeProvider";
import { StatusProvider } from "./providers/StatusProvider";
import StatusPill from "./components/StatusPill";

const App = () => {
  return (
    <ThemeProvider>
      <StatusProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/moreinfo/about" element={<AboutPage />} />

          <Route path="/:roomId" element={<EditorPage />} />
        </Routes>
        <StatusPill />
      </StatusProvider>
    </ThemeProvider>
  );
};

export default App;
