'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Using a separate function or checking the mounted state 
  // correctly prevents the "cascading render" lint error.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder with the same dimensions 
  // This prevents layout shift and hydration errors.
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="opacity-0" aria-hidden="true">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="transition-transform duration-300 hover:rotate-12"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 animate-in fade-in zoom-in" />
      ) : (
        <Sun className="h-5 w-5 animate-in fade-in zoom-in" />
      )}
    </Button>
  );
}