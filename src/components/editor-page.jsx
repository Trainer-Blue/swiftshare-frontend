import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "./editor";
import FileManagerSidebar from "./FileManagerSidebar";
import UsernameInput from "./UsernameInput";

function EditorPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("swiftshare-username") || "";
  });

  const handleUsernameChange = (newName) => {
    setUsername(newName);
    localStorage.setItem("swiftshare-username", newName);
  };

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
  };

  React.useEffect(() => {
    document.title = `${roomId} - SwiftShare.in`;
  }, [roomId]);

  const handleFileAdd = (fileData) => {
    if (editorRef.current?.addFile) {
      editorRef.current.addFile(fileData);
    }
  };

  const handleDownload = () => {
    const text = editorRef.current?.getText();
    if (!text) return;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${roomId || "document"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="min-h-screen relative"
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSidebarOpen(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // Just keep sidebar open, user will drop on the sidebar's drop zone
      }}
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-orange-500/5 to-transparent pointer-events-none" />

      {/* Floating Header */}
      <div className="sticky top-6 z-40 px-6 mb-12">
        <div className="max-w-4xl mx-auto bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg shadow-black/5 dark:shadow-black/20">
          {/* Folder Icon for Sidebar */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-(--color-bg-light) dark:hover:bg-(--color-bg-dark) text-(--color-text-light) dark:text-(--color-text-dark) transition-colors opacity-70 hover:opacity-100"
            title="Open files"
          >
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
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="p-1 rounded-lg hover:bg-(--color-bg-light) dark:hover:bg-(--color-bg-dark) text-(--color-text-light) dark:text-(--color-text-dark) transition-colors opacity-50 hover:opacity-100"
              title="Back to home"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>

            {/* Room Name */}
            <div className="flex flex-col items-center">
              <h1 className="text-sm font-medium tracking-wide text-(--color-text-light) dark:text-(--color-text-dark)">
                {roomId}
              </h1>
              <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">
                Document
              </span>
            </div>
          </div>

          {/* Username Input */}
          <UsernameInput
            value={username}
            onChange={handleUsernameChange}
          />

          <button
            onClick={handleDownload}
            className="p-2 rounded-lg hover:bg-(--color-bg-light) dark:hover:bg-(--color-bg-dark) text-(--color-text-light) dark:text-(--color-text-dark) transition-colors opacity-70 hover:opacity-100 cursor-pointer"
            title={`Download as ${roomId || "document"}.txt`}
          >
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="min-h-[80vh]">
          <Editor
            ref={editorRef}
            roomId={roomId}
            onFilesChange={handleFilesChange}
            username={username}
            onUsernameChange={handleUsernameChange}
          />
        </div>
      </div>

      {/* File Manager Sidebar */}
      <FileManagerSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        files={files}
        onFileAdd={handleFileAdd}
        roomId={roomId}
      />
    </div>
  );
}

export default EditorPage;
