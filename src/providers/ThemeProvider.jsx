import React, { createContext, useState, useContext, useMemo } from "react";
import { theme as appThemes } from "../constants/theme"; // Assuming your theme definitions are here

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("dark"); // Default to dark theme

  const toggleTheme = () => {
    setThemeName((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Memoize the theme object to prevent unnecessary re-renders
  const currentTheme = useMemo(() => appThemes[themeName], [themeName]);

  // Inject theme variables into the global scope (document body)
  React.useEffect(() => {
    const root = window.document.documentElement;
    root.style.setProperty("--primary-bg", currentTheme.colors.background.main);
    root.style.setProperty(
      "--secondary-bg",
      currentTheme.colors.background.secondary
    );
    root.style.setProperty(
      "--tertiary-bg",
      currentTheme.colors.background.tertiary
    );
    root.style.setProperty(
      "--card-bg",
      currentTheme.colors.background.tertiary
    ); // Or a specific card background
    root.style.setProperty(
      "--hover-bg",
      currentTheme.colors.background.secondary
    ); // Or a specific hover
    root.style.setProperty("--border-color", currentTheme.colors.text.tertiary); // Or a specific border color

    root.style.setProperty("--text-primary", currentTheme.colors.text.primary);
    root.style.setProperty(
      "--text-secondary",
      currentTheme.colors.text.secondary
    );
    root.style.setProperty("--text-muted", currentTheme.colors.text.tertiary);

    // Add other CSS variables from your theme.js as needed
    // Example for gradients (if you use them directly as variables)
    root.style.setProperty(
      "--primary-gradient",
      currentTheme.gradients.primary
    );
    root.style.setProperty("--navbar-bg", currentTheme.colors.background.main);

    // Set a data-theme attribute on the body for CSS selectors if needed
    document.body.setAttribute("data-theme", themeName);
  }, [currentTheme, themeName]);

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, themeName, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
