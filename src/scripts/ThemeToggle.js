function initThemeToggle() {
  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
  }

  // Add click handler to theme toggle button
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle?.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

document.addEventListener("DOMContentLoaded", initThemeToggle);
