export default {
  darkMode: "class", // ✅ Ensure dark mode uses the "dark" class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E293B",
        mediumGray: "#475569",
        lightGray: "#CBD5E1",
      },
    },
  },
  plugins: [],
};
