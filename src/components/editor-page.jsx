import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "./editor";

function EditorPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl shadow-orange-200/50 overflow-hidden">
        <div className="bg-linear-to-r from-orange-600 to-amber-600 px-8 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-amber-50 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
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
          <h1 className="text-center font-bold text-2xl text-amber-50 tracking-tight">
            Room: {roomId}
          </h1>
          <div className="w-6"></div>
        </div>
        <Editor roomId={roomId} />
      </div>
    </div>
  );
}

export default EditorPage;
