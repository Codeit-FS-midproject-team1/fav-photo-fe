import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css.js";
import { media, responsiveWidths } from "@/styles/responsive.css";

export const main = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  color: vars.color.white,
});

export const panel = style({
  ...responsiveWidths.desktop,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@media": {
    [media.tabletOnly]: responsiveWidths.tablet,
    [media.mobile]: responsiveWidths.mobile,
  },
});

export const logo = style({
  display: "block",
  width: 330,
  height: 60,
  marginBottom: 40,
  "@media": {
    [media.mobile]: {
      width: 190,
      height: 35,
    },
  },
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 12,
});

export const formError = style({
  color: vars.color.red,
  textAlign: "center",
});

export const submitButton = style({
  width: "100%",
  marginTop: 10,
});

export const googleButton = style({
  background: vars.color.white,
  color: vars.color.black,
  fontWeight: vars.fontWeight.regular,
  fontSize: 18,
  display: "inline-flex",
  alignItems: "center",
  gap: 12,
});

export const footer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
  marginTop: 42,
  color: vars.color.white,
  textAlign: "center",
  fontSize: 16,
  "@media": {
    [media.mobile]: {
      fontSize: 14,
    },
  },
});

export const footerLink = style({
  color: vars.color.main,
  textDecoration: "underline",
  textUnderlineOffset: 3,
});
