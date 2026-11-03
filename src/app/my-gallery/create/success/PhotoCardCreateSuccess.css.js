import { style } from "@vanilla-extract/css";
import { fontWeight, vars } from "@/styles/theme.css";

export const page = style({
  minHeight: "calc(100vh - 81px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "80px 24px 120px",
  backgroundColor: vars.color.black,
});

export const content = style({
  width: "100%",
  maxWidth: 880,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

export const title = style({
  margin: 0,
  color: vars.color.white,
  fontSize: "4.5rem",
  fontWeight: fontWeight.bold,
  lineHeight: 1.2,
});

export const accent = style({
  color: vars.color.main,
});

export const message = style({
  margin: "3rem 0 6rem",
  color: vars.color.white,
  fontSize: "1.5rem",
  fontWeight: fontWeight.bold,
});

export const galleryButton = style({
  width: "100%",
  maxWidth: 880,
  minHeight: 120,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${vars.color.white}`,
  color: vars.color.white,
  fontSize: "1.5rem",
  fontWeight: fontWeight.bold,
  textDecoration: "none",
  transition: "background-color 0.2s, color 0.2s",

  selectors: {
    "&:hover": {
      backgroundColor: vars.color.white,
      color: vars.color.black,
    },
  },

  "@media": {
    "screen and (max-width: 767px)": {
      minHeight: 72,
      fontSize: "1rem",
    },
  },
});
