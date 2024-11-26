/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Custom grid templates
        customGrid: "repeat(1, minmax(0, 1fr))", // Default: 2 columns
        smCustomGrid: "repeat(2, minmax(0, 1fr))", // Default: 2 columns
        mdCustomGrid: "repeat(3, minmax(0, 1fr))", // Medium: 3 columns
        lgCustomGrid: "repeat(4, minmax(0, 1fr))", // Large: 4 columns
        xlCustomGrid: "repeat(5, minmax(0, 1fr))", // Extra large: 5 columns
      },
      spacing: {
        // Custom gap sizes
        5: "1.25rem", // Gap 5
        10: "2.5rem", // Gap 10
      },
      screens: {
        lgPlus: "1100px",
      },
    },
  },
  variants: {},
  plugins: [require("tailwind-scrollbar")],
};
