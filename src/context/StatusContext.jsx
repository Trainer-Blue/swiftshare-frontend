import React, { createContext, useContext, useState } from "react";

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState("disconnected"); // 'connecting', 'connected', 'disconnected', 'error'

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => {
  const context = useContext(StatusContext);
  if (context === undefined) {
    throw new Error("useStatus must be used within a StatusProvider");
  }
  return context;
};
