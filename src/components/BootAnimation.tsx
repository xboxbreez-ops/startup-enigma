import { useEffect, useState } from "react";

interface BootAnimationProps {
  onComplete: () => void;
}

const BootAnimation = ({ onComplete }: BootAnimationProps) => {
  const [phase, setPhase] = useState<"flash" | "loading" | "done">("flash");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("loading"), 200);
    const t2 = setTimeout(() => setPhase("done"), 2500);
    const t3 = setTimeout(() => onComplete(), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div
        className={`flex flex-col items-center transition-opacity duration-500 ${
          phase === "done" ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Windows Logo */}
        <svg
          width="88"
          height="88"
          viewBox="0 0 88 88"
          className={`${phase === "flash" ? "animate-ping" : ""}`}
        >
          <rect x="2" y="2" width="38" height="38" fill="white" rx="2" />
          <rect x="48" y="2" width="38" height="38" fill="white" rx="2" />
          <rect x="2" y="48" width="38" height="38" fill="white" rx="2" />
          <rect x="48" y="48" width="38" height="38" fill="white" rx="2" />
        </svg>
        {phase === "loading" && (
          <div className="mt-8 flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-foreground"
                style={{
                  animation: "dotSpin 1.2s infinite",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BootAnimation;
