import { useState, useCallback } from "react";
import LockScreen from "@/components/LockScreen";
import LoginScreen from "@/components/LoginScreen";
import BootAnimation from "@/components/BootAnimation";
import WindowsDesktop from "@/components/WindowsDesktop";

type Phase = "lock" | "login" | "boot" | "desktop";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("lock");

  const handleBootComplete = useCallback(() => setPhase("desktop"), []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      {phase === "lock" && <LockScreen onUnlock={() => setPhase("login")} />}
      {phase === "login" && <LoginScreen onLogin={() => setPhase("boot")} />}
      {phase === "boot" && <BootAnimation onComplete={handleBootComplete} />}
      {phase === "desktop" && <WindowsDesktop />}
    </div>
  );
};

export default Index;
