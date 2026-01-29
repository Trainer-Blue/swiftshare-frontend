# SwiftShare.in Frontend

The frontend interface for SwiftShare.in, featuring a "Premium Minimalist" design and a seamless collaborative writing experience.

## 🎨 Features

- **Real-Time Collaboration**: See others' edits in real-time with zero conflicts (powered by Yjs).
- **Premium Minimalist Design**: A clean, distraction-free UI with Glassmorphism effects.
- **Dark Mode**: Fully supported dark theme with persistent preference.
- **Connection Resilience**: Visual status indicator, automatic reconnection handling, and graceful error states.
- **Rich Text Editor**: Customized Quill editor for a smooth writing experience.

## 🛠️ Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS (v4)
- **Editor**: Quill (via `react-quill` / `y-quill`)
- **State Management**: React Context API (`ThemeContext`, `StatusContext`)
- **Collaboration**: `yjs`, `y-websocket`

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Backend Server running (see `../backend/README.md`)

### Installation

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Configuration

Create a `.env` file if you need to override defaults (optional for local dev):

```env
VITE_WS_URL=ws://localhost:1234
```

### Running the App

- **Development**:
  ```bash
  npm run dev
  ```
- **Build**:
  ```bash
  npm run build
  ```

## 📂 Project Structure

- `src/components`: UI components (`StatusPill`, `Editor`, etc.)
- `src/context`: React Context definitions and Hooks (`useTheme`, `useStatus`).
- `src/providers`: Context Provider components (`ThemeProvider`, `StatusProvider`).
- `src/index.css`: Global styles and Tailwind configuration.

## 🧩 Key Components

### Status Pill

A floating indicator in the bottom-right that shows:

- **Connection Status**: Connecting (Yellow), Connected (Green), Error (Red).
- **Theme Toggle**: Switch between Light and Dark modes.
- **Server Check**: Hover to check uptime status.

### Editor

The core writing surface. It locks automatically if the connection is lost to prevent data divergence and unlocks once synchronized.
