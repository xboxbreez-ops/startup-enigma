import { useState, useRef } from "react";

const InfinityProxy = ({ onClose }: { onClose: () => void }) => {
  const [url, setUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = url.trim();
    if (!target) return;

    // If it looks like a URL, use it directly through a proxy
    if (target.includes(".") && !target.includes(" ")) {
      if (!target.startsWith("http")) target = "https://" + target;
      setCurrentUrl(`https://www.google.com/search?igu=1&q=${encodeURIComponent(target)}`);
    } else {
      // Search query
      setCurrentUrl(`https://www.google.com/search?igu=1&q=${encodeURIComponent(target)}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#0a0a0a" }}>
      {/* Title bar */}
      <div className="h-10 flex items-center px-3 gap-3 shrink-0" style={{ background: "#111" }}>
        <div className="flex items-center gap-2">
          {/* Fire infinity icon */}
          <svg width="22" height="14" viewBox="0 0 32 18" fill="none">
            <defs>
              <linearGradient id="fireGrad" x1="0" y1="18" x2="0" y2="0">
                <stop offset="0%" stopColor="#ff4500" />
                <stop offset="40%" stopColor="#ff8c00" />
                <stop offset="100%" stopColor="#ffd700" />
              </linearGradient>
            </defs>
            <path
              d="M8 3C4 3 1 6 1 9s3 6 7 6c2.5 0 4.5-1.2 6-3l2-3 2 3c1.5 1.8 3.5 3 6 3 4 0 7-3 7-6s-3-6-7-6c-2.5 0-4.5 1.2-6 3l-2 3-2-3C12.5 4.2 10.5 3 8 3z"
              stroke="url(#fireGrad)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <span
            className="text-sm font-bold tracking-wide"
            style={{
              background: "linear-gradient(180deg, #ffd700 0%, #ff8c00 40%, #ff4500 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Infinity Proxy
          </span>
        </div>

        <form onSubmit={handleNavigate} className="flex-1 mx-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Search or enter URL..."
            className="w-full h-7 px-3 rounded text-sm outline-none"
            style={{
              background: "#1a1a1a",
              border: "1px solid #333",
              color: "#e0e0e0",
            }}
          />
        </form>

        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-600/80 transition-colors"
          style={{ color: "#aaa" }}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 relative">
        {!currentUrl ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            {/* Big infinity logo */}
            <svg width="120" height="70" viewBox="0 0 32 18" fill="none">
              <defs>
                <linearGradient id="fireGradBig" x1="0" y1="18" x2="0" y2="0">
                  <stop offset="0%" stopColor="#ff4500" />
                  <stop offset="50%" stopColor="#ff8c00" />
                  <stop offset="100%" stopColor="#ffd700" />
                </linearGradient>
                <filter id="fireGlow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M8 3C4 3 1 6 1 9s3 6 7 6c2.5 0 4.5-1.2 6-3l2-3 2 3c1.5 1.8 3.5 3 6 3 4 0 7-3 7-6s-3-6-7-6c-2.5 0-4.5 1.2-6 3l-2 3-2-3C12.5 4.2 10.5 3 8 3z"
                stroke="url(#fireGradBig)"
                strokeWidth="2"
                fill="none"
                filter="url(#fireGlow)"
              />
            </svg>
            <h1
              className="text-3xl font-bold tracking-wider"
              style={{
                background: "linear-gradient(180deg, #ffd700 0%, #ff8c00 40%, #ff4500 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Infinity Proxy
            </h1>
            <p className="text-sm" style={{ color: "#555" }}>
              Search anything, unblocked.
            </p>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={currentUrl}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            title="Proxy Browser"
          />
        )}
      </div>
    </div>
  );
};

export default InfinityProxy;
