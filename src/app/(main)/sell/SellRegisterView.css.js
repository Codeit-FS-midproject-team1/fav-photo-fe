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
    [media.mobile]: { padding: "24px 16px 56px" },
  },
});

export const header = style({ marginBottom: "32px" });

export const title = style({
  fontSize: vars.fontSize.heading3,
  fontWeight: vars.fontWeight.bold,
  lineHeight: 1.4,
  "@media": { [media.mobile]: { fontSize: vars.fontSize.bodyLarge } },
});

export const description = style({
  marginTop: "12px",
  fontSize: vars.fontSize.body,
  color: vars.color.gray300,
  lineHeight: 1.6,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "24px",
  "@media": {
    [media.tabletOnly]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    [media.mobile]: {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
});

export const emptyState = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "16px",
});

export const message = style({
  color: vars.color.gray200,
  lineHeight: 1.6,
});

export const notice = style({
  padding: "16px",
  marginBottom: "24px",
  border: `1px solid ${vars.color.gray400}`,
  color: vars.color.white,
  lineHeight: 1.6,
});

export const error = style({
  padding: "16px",
  color: vars.color.red,
  lineHeight: 1.6,
});

export const link = style({
  color: vars.color.main,
  textDecoration: "underline",
});

export const pagination = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "24px",
  marginTop: "32px",
});

export const pageButton = style({
  minWidth: "80px",
  padding: "10px 16px",
  border: `1px solid ${vars.color.gray400}`,
  backgroundColor: vars.color.gray500,
  color: vars.color.white,
  cursor: "pointer",
  selectors: {
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    "&:focus-visible": { outline: `2px solid ${vars.color.main}` },
  },
});
