import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

// Yjs imports
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
import { WebsocketProvider } from "y-websocket";

const Editor = ({ roomId }) => {
  const containerRef = useRef(null);
  const quillRef = useRef(null);

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

    // Yjs setup with dynamic room ID from URL
    const ydoc = new Y.Doc();

    const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:1234";

    console.log("Connecting to WebSocket server");

    const provider = new WebsocketProvider(
      wsUrl,
      roomId || "room-0", // Use roomId from props or default
      ydoc
    );
    const ytext = ydoc.getText("quill");
    const binding = new QuillBinding(ytext, quillRef.current);

    return () => {
      binding.destroy();
      provider.destroy();
      if (container) {
        container.innerHTML = "";
      }
      quillRef.current = null;
    };
  }, [roomId]); // Re-connect if roomId changes

  return <div ref={containerRef}></div>;
};

export default Editor;
