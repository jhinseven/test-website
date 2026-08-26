/**
 * Theme / light-dark mode
 * Always follows the visitor's system light/dark setting. The toggle can
 * flip the page for this visit only; a reload or a system change snaps
 * back to the OS theme. Nothing is stored in the browser.
 */

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
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
  applyTheme(systemTheme());

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    applyTheme(systemTheme());
  });

  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    applyTheme(next);
  });
}
