import React, { useState, useEffect, useRef } from "react";

const UsernameInput = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    const trimmed = tempValue.trim();
    if (trimmed && trimmed !== value) {
      onChange(trimmed);
    } else {
      setTempValue(value);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSubmit}
        onKeyDown={handleKeyDown}
        maxLength={20}
        className="w-24 px-2 py-1 text-xs font-medium rounded-lg 
          bg-transparent border border-(--color-border-light) dark:border-(--color-border-dark)
          text-(--color-text-light) dark:text-(--color-text-dark)
          focus:outline-none focus:border-(--color-primary)
          transition-colors"
        placeholder="Your name"
      />
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-lg
        text-(--color-text-light) dark:text-(--color-text-dark)
        hover:bg-(--color-bg-light) dark:hover:bg-(--color-bg-dark)
        opacity-70 hover:opacity-100 transition-all cursor-pointer"
      title="Click to change your name"
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      <span className="max-w-20 truncate">{value}</span>
      <svg
        className="w-2.5 h-2.5 opacity-50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </button>
  );
};

export default UsernameInput;
