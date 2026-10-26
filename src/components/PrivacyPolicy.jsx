import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - SwiftShare.in";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        "Privacy Policy for SwiftShare.in. Understand how data is handled and our policy regarding third-party advertising partners like Google AdSense.";
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-y-auto overflow-x-hidden selection:bg-orange-500/20">
      {/* Background Glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
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
          <Link
            to="/moreinfo/about"
            className="text-sm font-medium tracking-widest uppercase hover:text-(--color-primary) transition-colors opacity-60 hover:opacity-100"
          >
            About
          </Link>
        </nav>

        {/* Content Card */}
        <div className="bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50 rounded-2xl p-8 md:p-14 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-(--color-primary) mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm opacity-50 mb-10">Last updated: October 2026</p>

          <div className="space-y-8 text-sm md:text-base leading-relaxed opacity-90">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-(--color-primary)">
                1. Overview
              </h2>
              <p>
                At <strong>SwiftShare.in</strong>, accessible from{" "}
                <a
                  href="https://www.swiftshare.in"
                  className="text-(--color-primary) underline"
                >
                  swiftshare.in
                </a>
                , we are deeply committed to privacy and simplicity. We do not
                require registration, accounts, or personal information to use
                our collaborative editor.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-(--color-primary)">
                2. Information Collection and Use
              </h2>
              <p>
                We do not collect names, email addresses, or phone numbers.
                Collaborative room data is synchronized in real-time across peers
                using CRDTs (Conflict-free Replicated Data Types) and WebSockets
                for document synchronization.
              </p>
            </section>

            <section className="p-6 rounded-xl border border-orange-500/30 bg-orange-500/5">
              <h2 className="text-xl font-semibold mb-3 text-(--color-primary)">
                3. Advertising and Google AdSense
              </h2>
              <p className="mb-3">
                SwiftShare.in uses third-party advertising companies, including{" "}
                <strong>Google AdSense</strong>, to serve advertisements when you
                visit our website.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Third-party vendors, including <strong>Google</strong>, use
                  cookies to serve ads based on a user's prior visits to this
                  website or other websites on the Internet.
                </li>
                <li>
                  Google's use of advertising cookies enables it and its
                  partners to serve ads to users based on their visits to our
                  site and/or other sites across the internet.
                </li>
                <li>
                  Users may opt out of personalized advertising by visiting{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--color-primary) underline font-medium"
                  >
                    Google Ads Settings
                  </a>
                  . Alternatively, you can opt out of third-party vendor use of
                  cookies for personalized advertising by visiting{" "}
                  <a
                    href="https://www.aboutads.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--color-primary) underline font-medium"
                  >
                    aboutads.info
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-(--color-primary)">
                4. Cookies & Log Files
              </h2>
              <p>
                Like many websites, SwiftShare.in uses standard log files and
                browser storage (like localStorage for theme preferences) to
                maintain basic functionality, optimize performance, and detect
                server errors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-(--color-primary)">
                5. Third-Party Links
              </h2>
              <p>
                Our service may contain links to external sites (such as GitHub).
                If you click on a third-party link, you will be directed to that
                site. Note that these external sites are not operated by us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-(--color-primary)">
                6. Contact
              </h2>
              <p>
                If you have questions or suggestions regarding our Privacy
                Policy, feel free to visit our{" "}
                <Link to="/moreinfo/about" className="text-(--color-primary) underline">
                  About page
                </Link>{" "}
                or submit an issue on our open-source GitHub repository.
              </p>
            </section>
          </div>
        </div>

        <footer className="text-center text-sm opacity-40 mt-12">
          &copy; {new Date().getFullYear()} SwiftShare.in. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
