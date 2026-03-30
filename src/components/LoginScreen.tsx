import { useState } from "react";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "zdawg1352") {
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/wallpaper.mov"
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
      <div
        className={`relative z-10 flex flex-col items-center ${shake ? "animate-shake" : ""}`}
      >
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
          </svg>
        </div>
        <h2 className="text-2xl font-light text-foreground mb-1">infinity</h2>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center gap-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            className="w-64 px-4 py-2 rounded-sm bg-foreground/10 border border-foreground/20 text-foreground placeholder:text-foreground/40 text-center focus:outline-none focus:border-primary"
            autoFocus
          />
          {error && (
            <p className="text-destructive text-sm">Incorrect password</p>
          )}
          <button
            type="submit"
            className="px-6 py-1.5 rounded-sm bg-primary text-primary-foreground text-sm hover:opacity-90"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
