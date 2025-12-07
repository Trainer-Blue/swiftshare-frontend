import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/home";
import EditorPage from "./components/editor-page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:roomId" element={<EditorPage />} />
    </Routes>
  );
};

export default App;
