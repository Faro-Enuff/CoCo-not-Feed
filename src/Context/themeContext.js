import React, { createContext, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";

const defaultContext = {
  activeTheme: "light",
  toggleTheme: () => {
    throw new Error("toggleTheme() not implemented");
  },
};

export const ThemeContext = createContext(defaultContext);

export const ThemeProvider = ({ children }) => {
  const [activeTheme, toggleTheme] = useState("dark");

  const defaultTheme = createTheme({});

  const muiTheme = createTheme({
    ...defaultTheme,
    typography: {
      fontFamily: "Quicksand",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
    },
    palette: {
      background: {
        default: "#efebe9",
      },
      primary: {
        light: "#c8e6c9",
        main: "#a5d6a7",
        dark: "#81c784",
        contrastText: "#fff",
      },
      secondary: {
        light: "#bcaaa4",
        main: "#a1887f",
        dark: "#8d6e63",
        contrastText: "#fff",
      },
    },
  });

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        toggleTheme,
      }}
    >
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
