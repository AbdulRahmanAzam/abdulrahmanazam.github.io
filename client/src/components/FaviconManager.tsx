"use client";
import { useEffect } from "react";
import { useDarkMode } from "@/hooks/use-dark-mode";

/**
 * Keeps the <link rel="icon"> in sync with the app theme toggle.
 * Falls back to light icon; switches to dark when html has .dark.
 */
export function FaviconManager() {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const link = (document.getElementById("favicon-dynamic") as HTMLLinkElement) ||
      (() => {
        const l = document.createElement("link");
        l.id = "favicon-dynamic";
        l.rel = "icon";
        l.type = "image/svg+xml";
        document.head.appendChild(l);
        return l;
      })();

    link.href = isDarkMode ? "/favicon-dark.svg" : "/favicon-light.svg";
  }, [isDarkMode]);

  return null;
}
