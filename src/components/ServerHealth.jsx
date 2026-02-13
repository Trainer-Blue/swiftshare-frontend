import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const ServerHealth = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:1234";

  const fetchHealth = useCallback(async () => {
    try {
      const response = await fetch(`${backendUrl}/api/health`);
      if (!response.ok) throw new Error("Server unreachable");
      const data = await response.json();
      setHealth(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [backendUrl]); // Only recreate if backendUrl changes (never)

  useEffect(() => {
    fetchHealth();

    // Set page title and meta tags
    document.title =
      "Server Health - SwiftShare.in | Real-Time Backend Metrics";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        "Monitor SwiftShare backend server health in real-time. View CPU usage, memory stats, active connections, and system metrics.";
    }

    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchHealth, 5000); // Refresh every 5s
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, fetchHealth]); 

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const getStatusColor = (status) => {
    if (status === "ok") return "text-green-500";
    if (status === "warning") return "text-yellow-500";
    return "text-red-500";
  };

  const getMemoryColor = (percent) => {
    if (percent > 90) return "text-red-500";
    if (percent > 75) return "text-yellow-500";
    return "text-green-500";
  };

  const getCpuColor = (percent) => {
    if (percent > 80) return "text-red-500";
    if (percent > 50) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="min-h-screen relative overflow-y-auto overflow-x-hidden selection:bg-orange-500/20">
      {/* Background Elements */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 md:py-20">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16 animate-fade-in-down">
          <Link
            to="/moreinfo/about"
            className="text-sm font-medium tracking-widest uppercase hover:text-(--color-primary) transition-colors opacity-60 hover:opacity-100 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to About
          </Link>

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`text-xs px-4 py-2 rounded-lg border transition-all cursor-pointer ${
              autoRefresh
                ? "border-(--color-primary) text-(--color-primary) bg-orange-500/5"
                : "border-(--color-border-light) dark:border-(--color-border-dark) opacity-60"
            }`}
          >
            {autoRefresh ? "Auto-refresh ON" : "Auto-refresh OFF"}
          </button>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-tighter mb-4">
            Server Health
          </h1>
          <p className="text-lg opacity-60">
            Real-time metrics from the SwiftShare backend
          </p>
        </header>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl text-center">
            <p className="text-red-500 font-medium mb-2">
              ⚠️ Server Unreachable
            </p>
            <p className="text-sm opacity-60">{error}</p>
            <button
              onClick={fetchHealth}
              className="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm transition-colors"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && !health && (
          <div className="text-center py-20 opacity-60">
            <div className="inline-block w-8 h-8 border-2 border-(--color-primary) border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Connecting to server...</p>
          </div>
        )}

        {/* Health Data */}
        {health && (
          <div className="space-y-6">
            {/* Status Banner */}
            <div className="bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-3xl p-8 text-center">
              <div
                className={`text-6xl font-light mb-2 ${getStatusColor(health.status)}`}
              >
                {health.status === "ok" ? "✓" : "⚠"}
              </div>
              <p className="text-2xl font-medium mb-1">
                Server is {health.status === "ok" ? "Healthy" : "Degraded"}
              </p>
              <p className="text-sm opacity-60">
                Uptime: {formatUptime(health.uptimeSeconds)}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* CPU */}
              <div className="bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium opacity-60 uppercase tracking-wider">
                    CPU Usage
                  </h3>
                  <span
                    className={`text-2xl font-bold ${getCpuColor(health.cpu?.percent || 0)}`}
                  >
                    {health.cpu?.percent || 0}%
                  </span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      (health.cpu?.percent || 0) > 80
                        ? "bg-red-500"
                        : (health.cpu?.percent || 0) > 50
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min(health.cpu?.percent || 0, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs opacity-60">
                  {health.cpu?.cores || 1} cores available
                </p>
              </div>

              {/* Memory - Process */}
              <div className="bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium opacity-60 uppercase tracking-wider">
                    Process Memory
                  </h3>
                  <span className="text-2xl font-bold">
                    {health.memory?.rssMB || 0}
                    <span className="text-sm opacity-60">MB</span>
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-60">Heap Used:</span>
                    <span className="font-medium">
                      {health.memory?.heapUsedMB || 0}MB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Heap Total:</span>
                    <span className="font-medium">
                      {health.memory?.heapTotalMB || 0}MB
                    </span>
                  </div>
                </div>
              </div>

              {/* Memory - System */}
              <div className="bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium opacity-60 uppercase tracking-wider">
                    System Memory
                  </h3>
                  <span
                    className={`text-2xl font-bold ${getMemoryColor(health.memory?.systemUsedPercent || 0)}`}
                  >
                    {health.memory?.systemUsedPercent || 0}%
                  </span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      (health.memory?.systemUsedPercent || 0) > 90
                        ? "bg-red-500"
                        : (health.memory?.systemUsedPercent || 0) > 75
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min(health.memory?.systemUsedPercent || 0, 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs opacity-60">
                  <span>{health.memory?.systemFreeGB || 0}GB free</span>
                  <span>{health.memory?.systemTotalGB || 0}GB total</span>
                </div>
              </div>

              {/* Connections */}
              <div className="bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium opacity-60 uppercase tracking-wider">
                    Connections
                  </h3>
                  <span className="text-2xl font-bold text-(--color-primary)">
                    {health.connections || 0}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-60">Peak:</span>
                    <span className="font-medium">
                      {health.peakConnections || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rooms */}
              <div className="bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium opacity-60 uppercase tracking-wider">
                    Active Rooms
                  </h3>
                  <span className="text-2xl font-bold text-(--color-primary)">
                    {health.rooms || 0}
                  </span>
                </div>
                <p className="text-xs opacity-60">
                  Documents currently in memory
                </p>
              </div>

              {/* Platform Info */}
              <div className="bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-3xl p-6">
                <h3 className="text-sm font-medium opacity-60 uppercase tracking-wider mb-4">
                  Platform
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-60">Node:</span>
                    <span className="font-medium font-mono text-xs">
                      {health.platform?.nodeVersion || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">OS:</span>
                    <span className="font-medium capitalize">
                      {health.platform?.platform || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Arch:</span>
                    <span className="font-medium">
                      {health.platform?.arch || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center text-xs opacity-40 pt-4">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerHealth;
