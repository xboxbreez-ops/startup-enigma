import { useState, useRef } from "react";

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const threshold = 200;

  const handleStart = (clientY: number) => {
    startY.current = clientY;
    setIsDragging(true);
  };

  const handleMove = (clientY: number) => {
    if (!isDragging) return;
    const delta = clientY - startY.current;
    if (delta > 0) setDragY(delta);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (dragY > threshold) {
      onUnlock();
    } else {
      setDragY(0);
    }
  };

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

  return (
    <div
      className="fixed inset-0 z-50 cursor-grab active:cursor-grabbing select-none"
      style={{
        transform: `translateY(${dragY}px)`,
        opacity: 1 - dragY / 400,
        transition: isDragging ? "none" : "all 0.3s ease-out",
      }}
      onMouseDown={(e) => handleStart(e.clientY)}
      onMouseMove={(e) => handleMove(e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientY)}
      onTouchEnd={handleEnd}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/wallpaper.mov"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-foreground">
        <p className="text-8xl font-light tracking-tight">{time}</p>
        <p className="text-xl mt-2 opacity-80">{date}</p>
        <div className="mt-16 flex flex-col items-center animate-bounce">
          <p className="text-sm opacity-60 mb-2">Swipe down to unlock</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
