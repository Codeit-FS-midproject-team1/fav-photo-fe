import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    black: null,
    gray500: null,
    gray400: null,
    gray300: null,
    gray200: null,
    gray100: null,
    white: null,
    red: null,
    blue: null,
    purple: null,
    pink: null,
    main: null,
  },

  font: {
    notoSans: null,
    br: null,
  },

  fontWeight: {
    light: null,
    regular: null,
    bold: null,
  },
});

export const themeClass = createTheme(vars, {
  color: {
    black: "#0F0F0F",
    gray500: "#161616",
    gray400: "#5A5A5A",
    gray300: "#AAAAAA",
    gray200: "#DDDDDD",
    gray100: "#EEEEEE",
    white: "#FFFFFF",
    red: "#FF483D",
    blue: "#29C9F9",
    purple: "#A77EFF",
    pink: "#FF2A6A",
    main: "#EFFF04",
  },

  font: {
    notoSans: "var(--font-noto-sans), sans-serif",
    br: "var(--font-br-b), sans-serif",
  },

  fontWeight: {
    light: "300",
    regular: "400",
    bold: "700",
  },
});
