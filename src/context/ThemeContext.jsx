// src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

// ThemeContext ko create karein
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleToast = (name) => {
    // Display a success toast notification when an item is added to cart
    toast.success(`${name} added to cart`);
  };

  // Theme update hone par dark mode ko toggle karein
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Theme toggle karane ka function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, handleToast }}>
      {children}
    </ThemeContext.Provider>
  );
};
