/**
 * Theme / light-dark mode
 * Stores the user's choice in localStorage so it survives page reloads.
 * Change defaultTheme if you want the site to start in light mode.
 */

const STORAGE_KEY = "nini-theme";
const defaultTheme = "dark";

export function getPreferredTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return defaultTheme;
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    const isDark = theme === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

export function initTheme() {
  applyTheme(getPreferredTheme());

  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });
}
