"use client";

import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Deliberately holds no React state: the active theme is read from the DOM at
 * click time, so the button renders identically on the server and the client
 * and there is nothing to mismatch on hydration. Which theme is showing is
 * conveyed by the page itself, and by the icon, which CSS flips.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const isDark =
      root.dataset.theme === "dark" ||
      (!root.dataset.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    const next = isDark ? "light" : "dark";
    root.dataset.theme = next;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Blocked storage (private mode, hardened settings): the choice simply
      // does not persist to the next visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch colour theme"
      className="-m-2 p-2 text-mute transition-colors duration-300 hover:text-ink cursor-pointer"
    >
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="theme-icon size-[13px]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
      >
        <circle cx="8" cy="8" r="7" />
        <path d="M8 1a7 7 0 0 0 0 14Z" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
