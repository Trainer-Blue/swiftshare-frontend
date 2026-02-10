import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useStatus } from "../context/StatusContext";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import "quill/dist/quill.snow.css";

// Yjs imports
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
import { WebsocketProvider } from "y-websocket";

// Register Quill Cursors module
Quill.register("modules/cursors", QuillCursors);

// Cursor colors - matches the CSS
const cursorColors = [
  "#ef4444",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#6366f1",
  "#db2777",
  "#22c55e",
  "#eab308",
  "#a855f7",
];

// Random animal names for anonymous users
const anonymousNames = [
  "Fox",
  "Bear",
  "Owl",
  "Rabbit",
  "Wolf",
  "Hawk",
  "Deer",
  "Lynx",
  "Crow",
  "Raven",
  "Sparrow",
  "Eagle",
  "Falcon"
];

const getRandomName = () =>
  anonymousNames[Math.floor(Math.random() * anonymousNames.length)];

const Editor = forwardRef(
  ({ roomId, onFilesChange, username, onUsernameChange }, ref) => {
    const containerRef = useRef(null);
    const quillRef = useRef(null);
    const yfilesRef = useRef(null);
    const providerRef = useRef(null);
    const bindingRef = useRef(null);

    const { setStatus, setUserCount } = useStatus();

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      getText: () => quillRef.current?.getText() || "",
      addFile: (fileData) => {
        if (yfilesRef.current) {
          yfilesRef.current.push([fileData]);
        }
      },
    }));

    // Update awareness when username changes
    useEffect(() => {
      if (providerRef.current && username) {
        const awareness = providerRef.current.awareness;
        const clientId = awareness.clientID;
        const color = cursorColors[clientId % cursorColors.length];

        awareness.setLocalStateField("user", {
          name: username,
          color: color,
        });
      }
    }, [username]);

    useEffect(() => {
      if (!containerRef.current || quillRef.current) return;

      const container = containerRef.current;
      const editorContainer = document.createElement("div");
      container.appendChild(editorContainer);

      const quill = new Quill(editorContainer, {
        theme: "snow",
        placeholder: "Start writing...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["video"],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["clean"],
          ],
          cursors: true,
        },
      });

      quillRef.current = quill;

      // Disable editor initially
      quill.enable(false);
      setStatus("connecting");

      // Yjs setup with dynamic room ID from URL
      const ydoc = new Y.Doc();

      const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:1234";

      console.log("Connecting to WebSocket server");

      const provider = new WebsocketProvider(wsUrl, roomId || "room-0", ydoc);
      providerRef.current = provider;

      // Set initial user awareness state
      const initialName = username || getRandomName();
      if (!username && onUsernameChange) {
        onUsernameChange(initialName);
      }

      const clientId = provider.awareness.clientID;
      const color = cursorColors[clientId % cursorColors.length];

      provider.awareness.setLocalStateField("user", {
        name: initialName,
        color: color,
      });

      // Track user count via awareness
      const updateUserCount = () => {
        const count = provider.awareness.getStates().size;
        setUserCount(count);
      };

      provider.awareness.on("change", updateUserCount);
      updateUserCount();

      let connectionAttempts = 0;

      provider.on("status", (event) => {
        console.log("WebSocket status:", event.status);
        if (event.status === "connected") {
          connectionAttempts = 0;
        } else if (event.status === "connecting") {
          connectionAttempts++;
          console.log(`Connection attempt ${connectionAttempts}/5`);
          if (connectionAttempts > 5) {
            provider.destroy();
            setStatus("error");
            console.error(
              "Connection failed after 5 attempts. Provider destroyed.",
            );
            return;
          }
          setStatus(event.status);
          quill.enable(false);
        } else {
          setStatus(event.status);
          quill.enable(false);
        }
      });

      provider.on("synced", (isSynced) => {
        console.log("Synced:", isSynced);
        if (isSynced) {
          setStatus("connected");
          quill.enable(true);
        }
      });

      const ytext = ydoc.getText("quill");

      // Create binding with awareness for cursor sync
      const binding = new QuillBinding(ytext, quill, provider.awareness);
      bindingRef.current = binding;

      // Setup Y.Array for file list synchronization
      const yfiles = ydoc.getArray("files");
      yfilesRef.current = yfiles;

      const syncFiles = () => {
        const fileList = yfiles.toArray();
        if (onFilesChange) {
          onFilesChange(fileList);
        }
      };

      syncFiles();
      yfiles.observe(syncFiles);

      return () => {
        provider.awareness.off("change", updateUserCount);
        yfiles.unobserve(syncFiles);
        if (bindingRef.current) {
          bindingRef.current.destroy();
          bindingRef.current = null;
        }
        provider.destroy();
        providerRef.current = null;
        if (container) {
          container.innerHTML = "";
        }
        quillRef.current = null;
        yfilesRef.current = null;
        setStatus("disconnected");
        setUserCount(0);
      };
    }, [roomId, setStatus, setUserCount]);

    return <div ref={containerRef}></div>;
  },
);

Editor.displayName = "Editor";

export default Editor;
