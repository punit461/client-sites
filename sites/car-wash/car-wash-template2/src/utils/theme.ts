"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F97316",
      light: "#FB923C",
      dark: "#EA580C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#171717",
      light: "#525252",
      dark: "#000000",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFF7ED",
    },
    success: {
      main: "#16A34A",
    },
    error: {
      main: "#DC2626",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },
  },
});
