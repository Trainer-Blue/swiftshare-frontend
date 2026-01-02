import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useStatus } from "../context/StatusContext";

const StatusPill = () => {
  const { theme, toggleTheme } = useTheme();
  const { status } = useStatus();
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return "bg-green-500";
      case "connecting":
        return "bg-yellow-500";
      case "disconnected":
        return "bg-red-500";
      case "error":
        return "bg-red-600";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "disconnected":
        return "Disconnected";
      case "error":
        return "Error";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 glass shadow-lg shadow-black/5 dark:shadow-black/20 rounded-full px-4 py-2 transition-all duration-300">
      {/* Status Indicator */}
      <a
        href="https://stats.uptimerobot.com/nLtFpsDecL"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 pr-3 border-r border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] hover:opacity-80 transition-opacity"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor()} animate-pulse`} />
        
        <div className="grid place-items-center">
          <span 
            className={`col-start-1 row-start-1 text-xs font-medium text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] whitespace-nowrap transition-all duration-300 ease-in-out ${
              isHovered ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            {getStatusText()}
          </span>
          <span 
            className={`col-start-1 row-start-1 text-xs font-medium text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] whitespace-nowrap transition-all duration-300 ease-in-out ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            Check Server Status
          </span>
        </div>
      </a>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-6 h-6 text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary)] transition-colors opacity-60 hover:opacity-100"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default StatusPill;
