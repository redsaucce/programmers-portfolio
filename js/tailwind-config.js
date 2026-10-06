/* ==========================================================================
   tailwind-config.js: shared Tailwind CDN config for every page
   Load this directly AFTER the Tailwind CDN <script> tag.

   Colors point at the CSS variables in css/style.css, so light/dark mode and
   the accent color are changed in ONE place (style.css :root and :root.dark).
   Note: color utilities backed by CSS variables do not support opacity
   modifiers (e.g. bg-accent/50). Use solid colors.
   ========================================================================== */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"DM Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        page: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--text)",
        muted: "var(--muted)",
        line: "var(--border)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        badge: "var(--badge-bg)",
        "badge-hover": "var(--badge-bg-hover)",
        "badge-ink": "var(--badge-text)",
      },
    },
  },
};