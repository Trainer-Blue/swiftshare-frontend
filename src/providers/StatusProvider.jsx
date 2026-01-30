import React, { useState } from "react";
import { StatusContext } from "../context/StatusContext";

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState("disconnected"); // 'connecting', 'connected', 'disconnected', 'error'
  const [userCount, setUserCount] = useState(0);

  return (
    <StatusContext.Provider value={{ status, setStatus, userCount, setUserCount }}>
      {children}
    </StatusContext.Provider>
  );
};

