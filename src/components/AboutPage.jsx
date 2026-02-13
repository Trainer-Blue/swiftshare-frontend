import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About - SwiftShare.in | Real-Time Collaborative Editor";
    // Update meta tags for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        "Learn more about SwiftShare.in, an open-source real-time collaborative text editor built with React, Yjs, and WebSockets.";
    }
  }, []);

  const features = [
    {
      title: "Real-Time Sync",
      description:
        "Powered by Yjs CRDTs for conflict-free editing across devices.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "File Sharing",
      description:
        "Share files instantly with drag & drop via shared Y.Array lists.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      ),
    },
    {
      title: "Privacy First",
      description: "No sign-up required. Just create a room and start sharing.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
  ];

  const techStack = [
    { name: "React", url: "https://react.dev/" },
    { name: "Yjs (CRDT)", url: "https://yjs.dev/" },
    {
      name: "WebSocket",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
    },
    { name: "MongoDB", url: "https://www.mongodb.com/" },
    { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
    { name: "Vite", url: "https://vitejs.dev/" },
  ];

  return (
    <div className="min-h-screen relative overflow-y-auto overflow-x-hidden selection:bg-orange-500/20">
      {/* Background Elements */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 md:py-20 lg:py-24">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16 md:mb-24 animate-fade-in-down">
          <Link
            to="/"
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
            Back to Home
          </Link>
        </nav>

        {/* Hero Section */}
        <header className="mb-24 text-center">
          <div className="inline-block bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-2xl px-8 py-12 md:p-16 mb-8 transform hover:scale-[1.01] transition-transform duration-500">
            <div className="flex justify-center">
              <img src="/logo.svg" alt="SwiftShare Logo" className="w-30 h-30 drop-shadow-2xl" />
            </div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-(--color-primary) mt-[-30px] mb-6">
              SwiftShare.in
            </h1>
            <p className="text-lg md:text-xl font-light text-(--color-text-light) dark:text-(--color-text-dark) opacity-80 max-w-2xl mx-auto leading-relaxed">
              Open-source, real-time collaborative text editor tailored for
              speed and simplicity. Built for developers, teams, and anyone who
              needs to share ideas instantly.
            </p>
          </div>
        </header>

        {/* Features Grid */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-3xl p-8 hover:shadow-(--color-primary)/10 transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-(--color-primary)/10 flex items-center justify-center text-(--color-primary) mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works & Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {/* How It Works */}
          <section className="bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-light tracking-tight mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-(--color-primary)"></span>
              How It Works
            </h2>
            <div className="space-y-8 relative">
              <div className="absolute left-[11px] top-3 bottom-3 w-px bg-(--color-border-light) dark:bg-(--color-border-dark) opacity-50"></div>

              {[
                "Create a room instantly",
                "Share the URL with collaborators",
                "Edit together in real-time",
              ].map((step, i) => (
                <div key={i} className="relative flex items-center gap-6">
                  <div className="w-6 h-6 rounded-full bg-(--color-bg-light) dark:bg-(--color-bg-dark) border border-(--color-primary) relative z-10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-(--color-primary)"></div>
                  </div>
                  <p className="text-lg font-light opacity-90">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-light tracking-tight mb-8">
              Technology Stack
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {techStack.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-(--color-border-light) dark:border-(--color-border-dark) hover:border-(--color-primary) hover:text-(--color-primary) transition-colors flex items-center justify-between group"
                >
                  <span className="font-medium opacity-80 group-hover:opacity-100">
                    {tech.name}
                  </span>
                  <svg
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Open Source / Footer */}
        <section id="open-source" className="text-center mb-16">
          <h2 className="text-3xl font-light tracking-tight mb-8">
            Clean & Open Source
          </h2>
          <p className="text-lg opacity-60 mb-10 max-w-xl mx-auto">
            SwiftShare is transparently built. Check out the code, contribute,
            or verify the security yourself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/Trainer-Blue/swiftshare-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-(--color-primary) text-white rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              Frontend Repo
            </a>
            <a
              href="https://github.com/Trainer-Blue/swiftshare-backend"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-(--color-primary) text-(--color-primary) rounded-xl font-medium hover:bg-orange-500/5 transition-all flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
              Backend Repo
            </a>
          </div>
          
          {/* Server Health Button */}
          <div className="mt-8">
            <Link
              to="/moreinfo/server-health"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 rounded-xl font-medium hover:bg-green-500/20 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              View Server Health
            </Link>
          </div>
        </section>

        <footer className="text-center text-sm opacity-40 pb-8">
          &copy; {new Date().getFullYear()} SwiftShare.in. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
