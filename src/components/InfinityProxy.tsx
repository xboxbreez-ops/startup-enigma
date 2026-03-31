import { useState, useRef, useEffect, useCallback } from "react";

const HACKER_LINES = [
  "Initializing secure tunnel...",
  "Bypassing firewall [████████░░] 80%",
  "Encrypting packet headers...",
  "Spoofing DNS resolution...",
  "Routing through proxy node 4.12.88.201",
  "Establishing TLS handshake...",
  "Injecting auth tokens...",
  "Masking IP address...",
  "Decrypting SSL certificates...",
  "Connection secured ✓",
  "Bypassing firewall [██████████] 100%",
  "Tunnel established. Loading target...",
];

const HackerLoading = ({ onDone }: { onDone: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < HACKER_LINES.length) {
        setLines((prev) => [...prev, HACKER_LINES[i]]);
        i++;
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setTimeout(onDone, 600);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8" style={{ background: "#0a0a0a" }}>
      <div
        ref={containerRef}
        className="w-full max-w-xl font-mono text-xs leading-6 overflow-y-auto max-h-80"
        style={{ color: "#00ff41" }}
      >
        {lines.map((line, idx) => (
          <div key={idx} className="flex gap-2">
            <span style={{ color: "#00aa30" }}>{">"}</span>
            <span>{line}</span>
          </div>
        ))}
        <span className="inline-block w-2 h-4 animate-pulse" style={{ background: "#00ff41" }} />
      </div>
    </div>
  );
};

const InfinityProxy = ({
  onClose,
  initialUrl,
}: {
  onClose: () => void;
  initialUrl?: string;
}) => {
  const [url, setUrl] = useState(initialUrl || "");
  const [currentUrl, setCurrentUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const buildProxyUrl = useCallback((target: string) => {
    return `https://www.croxyproxy.com/servlet/redirect.htm?context=default&servletName=go&url=${encodeURIComponent(target)}`;
  }, []);

  const navigate = useCallback(
    (target: string) => {
      if (!target.trim()) return;
      let finalTarget = target.trim();
      if (finalTarget.includes(".") && !finalTarget.includes(" ")) {
        if (!finalTarget.startsWith("http")) finalTarget = "https://" + finalTarget;
        setLoading(true);
        setCurrentUrl(buildProxyUrl(finalTarget));
      } else {
        setLoading(true);
        setCurrentUrl(
          buildProxyUrl("https://www.google.com/search?q=" + encodeURIComponent(finalTarget))
        );
      }
    },
    [buildProxyUrl]
  );

  // Auto-navigate if initialUrl is provided
  useEffect(() => {
    if (initialUrl) {
      navigate(initialUrl);
    }
  }, []);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#0a0a0a" }}>
      {/* Title bar */}
      <div className="h-10 flex items-center px-3 gap-3 shrink-0" style={{ background: "#111" }}>
        <div className="flex items-center gap-2">
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
          <span className="proxy-fire-text text-sm font-bold tracking-wide">
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
            <h1 className="proxy-fire-text text-3xl font-bold tracking-wider">
              Infinity Proxy
            </h1>
            <p className="text-sm" style={{ color: "#555" }}>
              Search anything, unblocked.
            </p>
          </div>
        ) : loading ? (
          <HackerLoading onDone={() => setLoading(false)} />
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
