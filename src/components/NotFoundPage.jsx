import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "404 - Page Not Found | SwiftShare.in";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-3xl p-10 relative z-10 shadow-2xl shadow-black/5 dark:shadow-black/20 text-center">
        {/* 404 Badge */}
        <div className="text-8xl font-extralight tracking-tight text-(--color-primary) mb-4 select-none">
          404
        </div>

        <h1 className="text-xl font-medium tracking-wide text-(--color-text-light) dark:text-(--color-text-dark) mb-2">
          Page Not Found
        </h1>

        <p className="text-sm text-(--color-text-light) dark:text-(--color-text-dark) opacity-60 mb-10 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been
          moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-(--color-primary) text-white py-4 px-6 rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-[0.98]"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
