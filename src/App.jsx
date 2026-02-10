import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/home";
import AboutPage from "./components/AboutPage";
import ServerHealth from "./components/ServerHealth";
import EditorPage from "./components/editor-page";
import { ThemeProvider } from "./providers/ThemeProvider";
import { StatusProvider } from "./providers/StatusProvider";
import StatusPill from "./components/StatusPill";
import { Analytics } from '@vercel/analytics/react';


const App = () => {
  return (
    <ThemeProvider>
      <StatusProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/moreinfo/about" element={<AboutPage />} />
          <Route path="/moreinfo/server-health" element={<ServerHealth />} />

          <Route path="/:roomId" element={<EditorPage />} />
        </Routes>
        <StatusPill />
        <Analytics />
      </StatusProvider>
    </ThemeProvider>
  );
};

export default App;
