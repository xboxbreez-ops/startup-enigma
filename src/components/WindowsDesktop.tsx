import { useState, useEffect } from "react";

const WindowsDesktop = () => {
  const [time, setTime] = useState(new Date());

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
    </div>
  );
};

export default WindowsDesktop;
