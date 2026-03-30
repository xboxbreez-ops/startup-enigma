import { useState, useEffect } from "react";
import InfinityProxy from "./InfinityProxy";
import VirtualPet from "./VirtualPet";

const WindowsDesktop = () => {
  const [time, setTime] = useState(new Date());
  const [proxyOpen, setProxyOpen] = useState(false);
  const [petActive, setPetActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formattedDate = time.toLocaleDateString([], { month: "numeric", day: "numeric", year: "numeric" });

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Desktop area with wallpaper */}
      <div className="flex-1 relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/wallpaper.mov"
        />

        {/* Desktop icons */}
        <div className="absolute top-4 left-4 flex flex-col gap-4 z-[1]">
          {/* Granny app */}
          <button className="flex flex-col items-center gap-1 w-20 group">
            <div className="w-14 h-14 rounded-lg overflow-hidden shadow-lg group-hover:ring-2 ring-foreground/30 transition-all">
              <img src="/granny-icon.png" alt="Granny" className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] text-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-medium">
              Granny
            </span>
          </button>

          {/* Roblox app */}
          <button className="flex flex-col items-center gap-1 w-20 group">
            <div className="w-14 h-14 rounded-lg overflow-hidden shadow-lg group-hover:ring-2 ring-foreground/30 transition-all">
              <img src="/roblox-icon.png" alt="Roblox" className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] text-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-medium">
              Roblox
            </span>
          </button>

          {/* Virtual Pet app */}
          <button
            onClick={() => setPetActive((p) => !p)}
            className="flex flex-col items-center gap-1 w-20 group"
          >
            <div className={`w-14 h-14 rounded-lg overflow-hidden shadow-lg group-hover:ring-2 ring-foreground/30 transition-all flex items-center justify-center ${petActive ? "bg-green-500/80" : "bg-amber-500/80"}`}>
              <svg width="32" height="40" viewBox="0 0 40 60">
                <circle cx="20" cy="12" r="10" fill="#FFD93D" stroke="#333" strokeWidth="1.5" />
                <circle cx="16" cy="10" r="2" fill="#333" />
                <circle cx="24" cy="10" r="2" fill="#333" />
                <path d="M15 15 Q20 20 25 15" stroke="#333" strokeWidth="1.5" fill="none" />
                <line x1="20" y1="22" x2="20" y2="40" stroke="#333" strokeWidth="2" />
                <line x1="20" y1="28" x2="10" y2="35" stroke="#333" strokeWidth="2" />
                <line x1="20" y1="28" x2="30" y2="35" stroke="#333" strokeWidth="2" />
                <line x1="20" y1="40" x2="12" y2="55" stroke="#333" strokeWidth="2" />
                <line x1="20" y1="40" x2="28" y2="55" stroke="#333" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-[11px] text-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-medium">
              Virtual Pet
            </span>
          </button>
        </div>

        {/* Center Infinity logo - reflective silvery glossy */}
        <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none">
          <svg width="100" height="60" viewBox="0 0 32 18" fill="none" className="drop-shadow-[0_2px_8px_rgba(200,200,220,0.3)]">
            <defs>
              <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="18">
                <stop offset="0%" stopColor="#f0f0f5" />
                <stop offset="25%" stopColor="#c0c0cc" />
                <stop offset="45%" stopColor="#ffffff" />
                <stop offset="55%" stopColor="#a8a8b8" />
                <stop offset="75%" stopColor="#e0e0ea" />
                <stop offset="100%" stopColor="#c8c8d5" />
              </linearGradient>
              <linearGradient id="silverStroke" x1="0" y1="0" x2="32" y2="18">
                <stop offset="0%" stopColor="#e8e8f0" />
                <stop offset="30%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#b0b0c0" />
                <stop offset="70%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#d0d0dd" />
              </linearGradient>
              <filter id="silverShine">
                <feSpecularLighting surfaceScale="3" specularConstant="1.2" specularExponent="20" result="spec">
                  <fePointLight x="16" y="-5" z="12" />
                </feSpecularLighting>
                <feComposite in="SourceGraphic" in2="spec" operator="arithmetic" k1="0" k2="1" k3="0.4" k4="0" />
              </filter>
            </defs>
            <path
              d="M8 3C4 3 1 6 1 9s3 6 7 6c2.5 0 4.5-1.2 6-3l2-3 2 3c1.5 1.8 3.5 3 6 3 4 0 7-3 7-6s-3-6-7-6c-2.5 0-4.5 1.2-6 3l-2 3-2-3C12.5 4.2 10.5 3 8 3z"
              stroke="url(#silverStroke)"
              strokeWidth="2.2"
              fill="none"
            />
            {/* Glossy highlight pass */}
            <path
              d="M8 3C4 3 1 6 1 9s3 6 7 6c2.5 0 4.5-1.2 6-3l2-3 2 3c1.5 1.8 3.5 3 6 3 4 0 7-3 7-6s-3-6-7-6c-2.5 0-4.5 1.2-6 3l-2 3-2-3C12.5 4.2 10.5 3 8 3z"
              stroke="url(#silverGrad)"
              strokeWidth="1"
              fill="none"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* Virtual Pet */}
        {petActive && <VirtualPet onRemove={() => setPetActive(false)} />}
      </div>

      {/* Taskbar */}
      <div className="h-12 bg-taskbar/95 backdrop-blur-sm flex items-center px-2 border-t border-border/30 z-10">
        {/* Start button */}
        <button className="h-10 w-10 flex items-center justify-center rounded hover:bg-foreground/10">
          <svg width="20" height="20" viewBox="0 0 88 88">
            <rect x="2" y="2" width="38" height="38" fill="hsl(var(--win-blue))" rx="2" />
            <rect x="48" y="2" width="38" height="38" fill="hsl(var(--win-blue))" rx="2" />
            <rect x="2" y="48" width="38" height="38" fill="hsl(var(--win-blue))" rx="2" />
            <rect x="48" y="48" width="38" height="38" fill="hsl(var(--win-blue))" rx="2" />
          </svg>
        </button>

        {/* Search */}
        <div className="ml-2 h-8 w-64 bg-foreground/5 rounded-full flex items-center px-3 gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span className="text-xs text-muted-foreground">Search</span>
        </div>

        {/* Pinned Infinity Proxy in taskbar */}
        <button
          onClick={() => setProxyOpen(true)}
          className="ml-3 h-10 px-3 flex items-center gap-2 rounded hover:bg-foreground/10 transition-colors"
          title="Infinity Proxy"
        >
          <svg width="18" height="12" viewBox="0 0 32 18" fill="none">
            <defs>
              <linearGradient id="taskbarFire" x1="0" y1="18" x2="0" y2="0">
                <stop offset="0%" stopColor="#ff4500" />
                <stop offset="50%" stopColor="#ff8c00" />
                <stop offset="100%" stopColor="#ffd700" />
              </linearGradient>
            </defs>
            <path
              d="M8 3C4 3 1 6 1 9s3 6 7 6c2.5 0 4.5-1.2 6-3l2-3 2 3c1.5 1.8 3.5 3 6 3 4 0 7-3 7-6s-3-6-7-6c-2.5 0-4.5 1.2-6 3l-2 3-2-3C12.5 4.2 10.5 3 8 3z"
              stroke="url(#taskbarFire)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* System tray */}
        <div className="flex items-center gap-1 mr-2">
          <button className="h-10 px-2 flex items-center justify-center rounded hover:bg-foreground/10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--taskbar-foreground))" strokeWidth="2">
              <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
            </svg>
          </button>
          <button className="h-10 px-2 flex items-center justify-center rounded hover:bg-foreground/10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--taskbar-foreground))" strokeWidth="2">
              <path d="M12 2v6M12 18v4M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M18 12h4M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
            </svg>
          </button>
        </div>

        {/* Clock */}
        <button className="h-10 px-3 flex flex-col items-end justify-center rounded hover:bg-foreground/10">
          <span className="text-xs text-taskbar-foreground">{formattedTime}</span>
          <span className="text-[10px] text-taskbar-foreground/70">{formattedDate}</span>
        </button>
      </div>

      {/* Proxy overlay */}
      {proxyOpen && <InfinityProxy onClose={() => setProxyOpen(false)} />}
    </div>
  );
};

export default WindowsDesktop;
