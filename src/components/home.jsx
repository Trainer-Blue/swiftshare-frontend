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
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full glass rounded-3xl p-10 relative z-10 shadow-2xl shadow-black/5 dark:shadow-black/20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light tracking-tight text-[var(--color-primary)] mb-3">GAIAPAD</h1>
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] opacity-60">
            live collaboration document
          </p>
        </div>

        <div className="space-y-6">
          <button
            onClick={createRoom}
            className="w-full bg-[var(--color-primary)] text-white py-4 px-6 rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-[0.98]"
          >
            Create New Room
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className="px-4 bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] opacity-50">or</span>
            </div>
          </div>

          <form onSubmit={joinRoom} className="space-y-4">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name..."
              className="w-full px-5 py-4 bg-transparent border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all placeholder:opacity-40 text-center"
            />
            <button
              type="submit"
              className="w-full bg-transparent border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] py-4 px-6 rounded-xl font-medium hover:bg-[var(--color-surface-light)] dark:hover:bg-[var(--color-surface-dark)] transition-all active:scale-[0.98]"
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
