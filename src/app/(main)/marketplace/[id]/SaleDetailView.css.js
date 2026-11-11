import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css.js";
import { media } from "@/styles/responsive.css.js";

export const page = style({
  width: "100%",
  maxWidth: "1240px",
  minHeight: "70vh",
  margin: "0 auto",
  padding: "40px 24px 80px",
  color: vars.color.white,
  "@media": {
    [media.mobile]: {
      padding: "20px 16px 48px",
    },
  },
});

export const stateBox = style({
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  textAlign: "center",
});

export const stateTitle = style({
  fontSize: "24px",
  fontWeight: vars.fontWeight.bold,
  color: vars.color.white,
});

export const stateText = style({
  fontSize: "16px",
  lineHeight: "1.6",
  color: vars.color.gray300,
});

export const retryButton = style({
  padding: "12px 24px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: vars.color.main,
  color: vars.color.black,
  fontSize: "16px",
  fontWeight: vars.fontWeight.bold,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      opacity: 0.9,
    },
  },
});

export const actionRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  "@media": {
    [media.mobile]: {
      flexDirection: "column",
    },
  },
});

export const notice = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "8px",
  padding: "20px",
  marginBottom: "24px",
  border: `1px solid ${vars.color.gray400}`,
  borderRadius: "8px",
  backgroundColor: vars.color.gray500,
  color: vars.color.white,
  lineHeight: "1.6",
});

export const noticeLink = style({
  marginTop: "8px",
  color: vars.color.main,
  fontWeight: vars.fontWeight.bold,
  textDecoration: "underline",
});

export const confirmBody = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  color: vars.color.white,
});

export const confirmTitle = style({
  margin: 0,
  fontSize: "24px",
  fontWeight: vars.fontWeight.bold,
});

export const confirmDescription = style({
  fontSize: "16px",
  lineHeight: "1.8",
  color: vars.color.gray200,
  whiteSpace: "pre-wrap",
});

export const confirmActions = style({
  display: "flex",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  gap: "12px",
  "@media": {
    [media.mobile]: {
      flexDirection: "column",
    },
  },
});

export const error = style({
  color: vars.color.red,
  fontSize: "14px",
  lineHeight: "1.6",
});
