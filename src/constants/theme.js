// theme.js
export const theme = {
  light: {
    colors: {
      primary: "#1DB954", // Spotify-like green
      secondary: "#FF6B6B", // Coral red
      background: {
        main: "#FFFFFF", // White
        secondary: "#F5F5F5", // Light gray
        tertiary: "#EBEBEB", // Slightly darker gray
      },
      text: {
        primary: "#121212", // Almost black
        secondary: "#404040", // Dark gray
        tertiary: "#717171", // Medium gray
      },
      accent: {
        blue: "#4ECDC4", // Turquoise
        purple: "#9B6BFF", // Light purple
        orange: "#FF8C42", // Orange
      },
      status: {
        success: "#1DB954", // Green
        error: "#FF4F4F", // Red
        warning: "#FFB649", // Yellow-orange
        info: "#3799DA", // Blue
      },
    },
    gradients: {
      primary: "linear-gradient(45deg, #1DB954, #1ED760)", // Green gradient
      secondary: "linear-gradient(45deg, #FF6B6B, #FF8787)", // Red gradient
      featured: "linear-gradient(45deg, #FF6B6B, #9B6BFF)", // Red to purple
      playlist: "linear-gradient(45deg, #4ECDC4, #1DB954)", // Turquoise to green
      album: "linear-gradient(45deg, #FF8C42, #FF6B6B)", // Orange to red
      artist: "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.8))", // Transparent to black
    },
  },
  dark: {
    colors: {
      primary: "#1DB954", // Spotify-like green
      secondary: "#FF6B6B", // Coral red
      background: {
        main: "#121212", // Dark gray
        secondary: "#181818", // Slightly lighter dark gray
        tertiary: "#282828", // Even lighter dark gray
      },
      text: {
        primary: "#FFFFFF", // White
        secondary: "#B3B3B3", // Light gray
        tertiary: "#727272", // Medium gray
      },
      accent: {
        blue: "#4ECDC4", // Turquoise
        purple: "#9B6BFF", // Light purple
        orange: "#FF8C42", // Orange
      },
      status: {
        success: "#1DB954", // Green
        error: "#FF4F4F", // Red
        warning: "#FFB649", // Yellow-orange
        info: "#3799DA", // Blue
      },
    },
    gradients: {
      primary: "linear-gradient(45deg, #1DB954, #1ED760)", // Green gradient
      secondary: "linear-gradient(45deg, #FF6B6B, #FF8787)", // Red gradient
      featured: "linear-gradient(45deg, #FF6B6B, #9B6BFF)", // Red to purple
      playlist: "linear-gradient(45deg, #4ECDC4, #1DB954)", // Turquoise to green
      album: "linear-gradient(45deg, #FF8C42, #FF6B6B)", // Orange to red
      artist: "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.8))", // Transparent to black
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    round: "50%",
  },
};
