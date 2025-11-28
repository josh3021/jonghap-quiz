"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const themes = [
  { name: "light", label: "라이트", icon: "☀️", color: "#ffffff", textColor: "#1a1a1a" },
  { name: "dark", label: "다크", icon: "🌙", color: "#1a1a1a", textColor: "#ffffff" },
  { name: "system", label: "시스템", icon: "💻", color: "linear-gradient(135deg, #ffffff 50%, #1a1a1a 50%)", textColor: "#666" },
] as const;

const colorThemes = [
  { name: "ocean", label: "오션", icon: "🌊", color: "#3b82f6", textColor: "#ffffff" },
  { name: "sunset", label: "선셋", icon: "🌅", color: "#f97316", textColor: "#ffffff" },
  { name: "forest", label: "포레스트", icon: "🌲", color: "#22c55e", textColor: "#ffffff" },
  { name: "lavender", label: "라벤더", icon: "💜", color: "#a855f7", textColor: "#ffffff" },
  { name: "rose", label: "로즈", icon: "🌹", color: "#ec4899", textColor: "#ffffff" },
  { name: "midnight", label: "미드나잇", icon: "🌌", color: "#1e3a5f", textColor: "#ffffff" },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-9 w-9">
        <span className="h-4 w-4 animate-pulse rounded bg-muted" />
      </Button>
    );
  }

  const currentTheme = [...themes, ...colorThemes].find((t) => t.name === theme) || themes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9" aria-label="테마 변경">
          <span className="text-base">{currentTheme.icon}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs text-muted-foreground">기본 테마</DropdownMenuLabel>
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              className="h-5 w-5 rounded-full border border-border flex items-center justify-center text-xs"
              style={{ background: t.color }}
            >
              {t.name === "system" && (
                <span className="text-[10px]">A</span>
              )}
            </div>
            <span className="flex-1">{t.label}</span>
            {theme === t.name && <span className="text-primary">✓</span>}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">컬러 테마</DropdownMenuLabel>

        {colorThemes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              className="h-5 w-5 rounded-full border border-border"
              style={{ backgroundColor: t.color }}
            />
            <span className="flex-1">{t.label}</span>
            <span className="text-xs">{t.icon}</span>
            {theme === t.name && <span className="text-primary">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
