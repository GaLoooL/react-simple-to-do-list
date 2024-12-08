/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-color)",
        color: "var(--text-color)",
        section: "var(--section-bg-color)",
        border: "var(--border-color)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        "table-header": "var(--table-header-color)",
        hover: "var(--hover-color)",
        button: "var(--bg-button-color)",
        input: "var(--input-text-color)",
        "hover-table-selected-row": "var(--hover-table-selected-row)",
      },
    },
  },
  plugins: [],
}
