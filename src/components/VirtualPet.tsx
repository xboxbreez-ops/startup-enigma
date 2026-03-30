import { useState, useRef, useEffect, useCallback } from "react";

const VirtualPet = ({ onRemove }: { onRemove: () => void }) => {
  const [pos, setPos] = useState({ x: window.innerWidth / 2 - 20, y: -60 });
  const [landed, setLanded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [facing, setFacing] = useState<"left" | "right">("right");
  const dragOffset = useRef({ x: 0, y: 0 });
  const groundY = window.innerHeight - 48 - 60; // taskbar height - pet height

  // Gravity fall
  useEffect(() => {
    if (landed || dragging) return;
    let y = pos.y;
    let vel = 0;
    let raf: number;
    const fall = () => {
      vel += 0.8;
      y += vel;
      if (y >= groundY) {
        y = groundY;
        setLanded(true);
      }
      setPos((p) => ({ ...p, y }));
      if (y < groundY) raf = requestAnimationFrame(fall);
    };
    raf = requestAnimationFrame(fall);
    return () => cancelAnimationFrame(raf);
  }, [landed, dragging]);

  // Idle walk when landed and not dragging
  useEffect(() => {
    if (!landed || dragging) return;
    const interval = setInterval(() => {
      setPos((p) => {
        const dir = Math.random() > 0.5 ? 1 : -1;
        const step = dir * (Math.random() * 30 + 10);
        const newX = Math.max(0, Math.min(window.innerWidth - 40, p.x + step));
        setFacing(dir > 0 ? "right" : "left");
        return { ...p, x: newX };
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [landed, dragging]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    setLanded(false);
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  }, [dragging]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
    // will trigger gravity again
  }, []);

  return (
    <div
      className="fixed z-[45] select-none cursor-grab active:cursor-grabbing"
      style={{
        left: pos.x,
        top: pos.y,
        transition: dragging ? "none" : "left 0.8s ease-in-out",
        transform: facing === "left" ? "scaleX(-1)" : "scaleX(1)",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Simple stick figure pet */}
      <svg width="40" height="60" viewBox="0 0 40 60">
        {/* Head */}
        <circle cx="20" cy="12" r="10" fill="#FFD93D" stroke="#333" strokeWidth="1.5" />
        {/* Eyes */}
        <circle cx="16" cy="10" r="2" fill="#333" />
        <circle cx="24" cy="10" r="2" fill="#333" />
        {/* Smile */}
        <path d="M15 15 Q20 20 25 15" stroke="#333" strokeWidth="1.5" fill="none" />
        {/* Body */}
        <line x1="20" y1="22" x2="20" y2="40" stroke="#333" strokeWidth="2" />
        {/* Arms */}
        <line x1="20" y1="28" x2="10" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="28" x2="30" y2="35" stroke="#333" strokeWidth="2" />
        {/* Legs */}
        <line x1="20" y1="40" x2="12" y2="55" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="40" x2="28" y2="55" stroke="#333" strokeWidth="2" />
        {/* Feet */}
        <circle cx="12" cy="56" r="3" fill="#FF6B6B" />
        <circle cx="28" cy="56" r="3" fill="#FF6B6B" />
        {/* Hands */}
        <circle cx="10" cy="35" r="2.5" fill="#FFD93D" />
        <circle cx="30" cy="35" r="2.5" fill="#FFD93D" />
      </svg>
    </div>
  );
};

export default VirtualPet;
