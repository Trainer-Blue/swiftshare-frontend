import React, { useEffect } from "react";

/**
 * Reusable Google AdSense Banner Component
 * Handles React StrictMode and SPA client-side routing safely.
 *
 * @param {Object} props
 * @param {string} [props.slot] - The Ad unit slot ID (created in your AdSense console)
 * @param {string} [props.format="auto"] - Ad format (e.g., "auto", "fluid", "rectangle")
 * @param {boolean} [props.responsive=true] - Whether the ad unit is full-width responsive
 * @param {string} [props.className=""] - Additional Tailwind / CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles for the ins element
 */
const AdBanner = ({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  style = { display: "block" },
}) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      // Silently catch ad-blocker or duplicate execution errors
      console.debug("AdSense render note:", err);
    }
  }, [slot]);

  return (
    <div className={`adsense-container overflow-hidden my-4 text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-9445927099669107"
        data-ad-slot={slot || ""}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};

export default AdBanner;
