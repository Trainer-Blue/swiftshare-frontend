import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/home";
import AboutPage from "./components/AboutPage";
import ServerHealth from "./components/ServerHealth";
import EditorPage from "./components/editor-page";
import NotFoundPage from "./components/NotFoundPage";
import { ThemeProvider } from "./providers/ThemeProvider";
import { StatusProvider } from "./providers/StatusProvider";
import StatusPill from "./components/StatusPill";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
  return (
    <ThemeProvider>
      <StatusProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Additional informational pages */}
          <Route path="/moreinfo/about" element={<AboutPage />} />
          <Route path="/moreinfo/server-health" element={<ServerHealth />} />

          {/* Main editor route with dynamic room ID */}
          <Route path="/:roomId" element={<EditorPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <StatusPill />
        <Analytics />
        <SpeedInsights />
      </StatusProvider>
    </ThemeProvider>
  );
};

export default App;
