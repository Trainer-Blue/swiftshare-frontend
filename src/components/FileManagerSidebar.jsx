import React, { useState, useCallback } from "react";
import { generateReactHelpers } from "@uploadthing/react";

const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:1234";
const apiUrl = wsUrl.replace("ws://", "http://").replace("wss://", "https://");

const { useUploadThing } = generateReactHelpers({
  url: `${apiUrl}/api/uploadthing`,
});

const FileManagerSidebar = ({ isOpen, onClose, files, onFileAdd }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = React.useRef(null);

  const { startUpload, isUploading } = useUploadThing("fileUploader", {
    onClientUploadComplete: (res) => {
      console.log("Files uploaded:", res);
      setUploadProgress(null);
      res.forEach((file) => {
        onFileAdd({
          name: file.name,
          url: file.ufsUrl,
          size: file.size,
          key: file.key,
          uploadedAt: Date.now(),
        });
      });
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      setUploadProgress(null);
      alert("Upload failed: " + error.message);
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if we're actually leaving the dropzone container
    if (e.currentTarget.contains(e.relatedTarget)) {
      return;
    }

    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles?.length > 0) {
        await startUpload(droppedFiles);
      }
    },
    [startUpload],
  );

  const handleFileInputChange = useCallback(
    async (e) => {
      const selectedFiles = Array.from(e.target.files || []);
      if (selectedFiles.length > 0) {
        await startUpload(selectedFiles);
      }
    },
    [startUpload],
  );

  const handleZoneClick = () => {
    fileInputRef.current?.click();
  };

  // File type icon helper
  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    const icons = {
      // Images
      jpg: "🖼️",
      jpeg: "🖼️",
      png: "🖼️",
      gif: "🖼️",
      svg: "🖼️",
      webp: "🖼️",
      // Documents
      pdf: "📄",
      doc: "📝",
      docx: "📝",
      txt: "📝",
      // Spreadsheets
      xls: "📊",
      xlsx: "📊",
      csv: "📊",
      // Presentations
      ppt: "📽️",
      pptx: "📽️",
      // Archives
      zip: "🗜️",
      rar: "🗜️",
      "7z": "🗜️",
      // Code
      js: "💻",
      jsx: "💻",
      ts: "💻",
      tsx: "💻",
      py: "💻",
      java: "💻",
      cpp: "💻",
      // Media
      mp4: "🎬",
      avi: "🎬",
      mov: "🎬",
      mp3: "🎵",
      wav: "🎵",
      // Other
      default: "📎",
    };
    return icons[ext] || icons.default;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleDownloadAll = async () => {
    if (files.length === 0) return;

    setIsDownloading(true);
    try {
      // Download each file with a delay between downloads
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const link = document.createElement("a");
          link.href = file.url;
          link.download = file.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Longer delay to avoid browser blocking multiple downloads
          if (i < files.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
          }
        } catch (error) {
          console.error(`Failed to download ${file.name}:`, error);
        }
      }
    } catch (error) {
      console.error("Failed to download files:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadFile = (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    link.target = "_blank";
    link.click();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 pointer-events-auto transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-96 bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border-r border-stone-200/50 dark:border-stone-700/50 z-50 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-300 dark:border-stone-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-200">
              Files
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors"
              aria-label="Close sidebar"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Download All Button */}
          {files.length > 0 && (
            <button
              onClick={handleDownloadAll}
              disabled={isDownloading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-stone-400 text-white rounded-lg transition-colors font-medium"
            >
              {isDownloading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Downloading...
                </>
              ) : (
                <>
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
                  Download All ({files.length})
                </>
              )}
            </button>
          )}

          {/* File Retention Info */}
          <div className="mt-4 p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-lg">
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                Files are automatically deleted 15 minutes after everyone leaves
                the room.
              </p>
            </div>
          </div>
        </div>

        {/* Upload Zone */}
        <div className="p-6 border-b border-stone-300 dark:border-stone-700">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleZoneClick}
            className={`relative overflow-hidden group border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ease-in-out ${
              isDragActive || isUploading
                ? "border-orange-600 bg-orange-50/50 dark:bg-orange-950/20 scale-[1.02]"
                : "border-stone-300 dark:border-stone-600 hover:border-orange-500 hover:bg-stone-50/50 dark:hover:bg-stone-800/50"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              className="hidden"
              multiple
            />

            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-[radial-gradient(#ea580c_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.1]"></div>
            </div>

            {isUploading ? (
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="relative">
                  <svg
                    className="animate-spin h-10 w-10 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-orange-600">
                      {Math.round(uploadProgress || 0)}%
                    </span>
                  </div>
                </div>
                <div className="w-full max-w-[200px]">
                  <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 animate-pulse">
                    Uploading files...
                  </p>
                  <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-orange-600 h-full rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center gap-3 transition-transform duration-300 group-hover:-translate-y-1">
                <div
                  className={`p-3 rounded-full transition-colors duration-300 ${isDragActive ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600" : "bg-stone-100 dark:bg-stone-800 text-stone-400 group-hover:text-orange-500 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20"}`}
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 group-hover:text-orange-600 transition-colors">
                    {isDragActive ? "Drop to upload!" : "Click or drag files"}
                  </p>
                  <p className="text-xs text-stone-500 mt-1.5 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors">
                    Max size 100MB per file
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto p-6">
          {files.length === 0 ? (
            <div className="text-center text-stone-500 dark:text-stone-400 py-12">
              <svg
                className="w-16 h-16 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <p>No files yet</p>
              <p className="text-sm mt-1">Upload or drag & drop files</p>
            </div>
          ) : (
            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  onClick={() => handleDownloadFile(file)}
                  className="group flex items-center gap-3 p-3 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg border border-stone-200 dark:border-stone-700 cursor-pointer transition-all hover:shadow-md"
                >
                  <div className="text-3xl shrink-0">
                    {getFileIcon(file.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-stone-800 dark:text-stone-200 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-stone-400 group-hover:text-orange-600 transition-colors shrink-0"
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default FileManagerSidebar;
