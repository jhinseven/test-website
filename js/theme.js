/**
 * Theme / light-dark mode
 * First visit follows the visitor's system setting. After they use the
 * toggle, that choice is stored in localStorage and wins on later visits.
 */

const STORAGE_KEY = "nini-theme";

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getPreferredTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return systemTheme();
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

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(systemTheme());
    }
  });

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
