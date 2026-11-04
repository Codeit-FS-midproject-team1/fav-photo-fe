import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

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
  fontSize: "46px",
  fontWeight: vars.fontWeight.regular,
  fontFamily: "var(--font-br-b)",
  lineHeight: 1.2,
});

export const accent = style({
  color: vars.color.main,
});

export const message = style({
  margin: "3rem 0 3.75rem",
  color: vars.color.white,
  fontSize: "1.5rem",
  fontWeight: vars.fontWeight.regular,
});

export const galleryButton = style({
  width: "100%",
  maxWidth: "440px",
  minHeight: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${vars.color.white}`,
  color: vars.color.white,
  padding: "17px 0",
  fontSize: "18px",
  fontWeight: vars.fontWeight.regular,
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
