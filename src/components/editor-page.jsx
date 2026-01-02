import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "./editor";

function EditorPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

      {/* Floating Header */}
      <div className="sticky top-6 z-50 px-6 mb-12">
        <div className="max-w-4xl mx-auto glass rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg shadow-black/5 dark:shadow-black/20">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-light)] dark:hover:bg-[var(--color-bg-dark)] text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] transition-colors opacity-70 hover:opacity-100"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          
          <div className="flex flex-col items-center">
             <h1 className="text-sm font-medium tracking-wide text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
              {roomId}
            </h1>
            <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Document</span>
          </div>

          <div className="w-9"></div> {/* Spacer for balance */}
        </div>
      </div>

      {/* Editor Container */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="min-h-[80vh]">
          <Editor roomId={roomId} />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
