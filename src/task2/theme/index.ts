// https://www.realtimecolors.com/
// Note: in real life the theme would have shades f.e. text 100 to 900
export interface Theme {
  colors: {
    text: string;
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    shadow: string;
    border: string;
    error: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    text: "#1a1a1a",
    background: "#ffffff",
    primary: "#86b011",
    secondary: "#64748b",
    accent: "#7c3aed",
    shadow: "rgba(0, 0, 0, 0.1)",
    border: "#e2e8f0",
    error: "#dc2626",
  },
};

export const darkTheme: Theme = {
  colors: {
    text: "#f1f5f9",
    background: "#0f172a",
    primary: "#86b011",
    secondary: "#94a3b8",
    accent: "#a78bfa",
    shadow: "rgba(0, 0, 0, 0.3)",
    border: "#334155",
    error: "#f87171",
  },
};
