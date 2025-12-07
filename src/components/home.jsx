import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  const createRoom = () => {
    const randomRoom = Math.random().toString(36).substring(2, 8);
    navigate(`/${randomRoom}`);
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (roomName.trim()) {
      navigate(`/${roomName.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center p-10">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-orange-200/50 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Gaiapad</h1>
          <p className="text-amber-800">Collaborative document editing</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={createRoom}
            className="w-full bg-linear-to-r from-orange-600 to-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-300 transition-all"
          >
            Create New Document
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-amber-600">or</span>
            </div>
          </div>

          <form onSubmit={joinRoom} className="space-y-3">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name..."
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-white border-2 border-orange-600 text-orange-600 py-3 px-6 rounded-lg font-semibold hover:bg-orange-50 transition-all"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
