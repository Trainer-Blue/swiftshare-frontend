import React, { useEffect, useRef } from "react";
import { useStatus } from "../context/StatusContext";
import Quill from "quill";
import "quill/dist/quill.snow.css";

// Yjs imports
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
import { WebsocketProvider } from "y-websocket";

const Editor = ({ roomId }) => {
  const containerRef = useRef(null);
  const quillRef = useRef(null);

  const { setStatus } = useStatus();

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    const container = containerRef.current;
    const editorContainer = document.createElement("div");
    container.appendChild(editorContainer);

    quillRef.current = new Quill(editorContainer, {
      theme: "snow",
      placeholder: "Start writing...",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          ["clean"],
        ],
      },
    });

    // Disable editor initially
    quillRef.current.enable(false);
    setStatus("connecting");

    // Yjs setup with dynamic room ID from URL
    const ydoc = new Y.Doc();

    const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:1234";

    console.log("Connecting to WebSocket server");

    const provider = new WebsocketProvider(
      wsUrl,
      roomId || "room-0", // Use roomId from props or default
      ydoc
    );

    let connectionAttempts = 0;

    provider.on("status", (event) => {
      console.log("WebSocket status:", event.status);
      if (event.status === "connected") {
        connectionAttempts = 0;
        // Wait for sync to enable editor
      } else if (event.status === "connecting") {
        connectionAttempts++;
        console.log(`Connection attempt ${connectionAttempts}/5`);
        if (connectionAttempts > 5) {
          // destroy() completely stops the provider and removes all event listeners
          provider.destroy(); 
          setStatus("error");
          console.error("Connection failed after 5 attempts. Provider destroyed.");
          return;
        }
        setStatus(event.status);
        quillRef.current?.enable(false);
      } else {
        setStatus(event.status); // 'disconnected'
        quillRef.current?.enable(false);
      }
    });

    provider.on("synced", (isSynced) => {
      console.log("Synced:", isSynced);
      if (isSynced) {
        setStatus("connected");
        quillRef.current?.enable(true);
      }
    });

    const ytext = ydoc.getText("quill");
    const binding = new QuillBinding(ytext, quillRef.current);

    return () => {
      binding.destroy();
      provider.destroy();
      if (container) {
        container.innerHTML = "";
      }
      quillRef.current = null;
      setStatus("disconnected");
    };
  }, [roomId, setStatus]); // Re-connect if roomId changes

  return <div ref={containerRef}></div>;
};

export default Editor;
