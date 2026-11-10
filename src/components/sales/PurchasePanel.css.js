import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css.js";
import { media } from "@/styles/responsive.css.js";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
});

export const quantityRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "12px",
});

export const label = style({
  color: vars.color.gray200,
  fontSize: "16px",
});

export const priceRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  color: vars.color.gray200,
});

export const total = style({
  color: vars.color.main,
  fontSize: "22px",
  fontWeight: vars.fontWeight.bold,
});

export const message = style({
  color: vars.color.gray200,
  lineHeight: "1.6",
});

export const confirmBody = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  color: vars.color.white,
});

export const confirmTitle = style({
  fontSize: "22px",
  fontWeight: vars.fontWeight.bold,
});

export const confirmText = style({
  fontSize: "20px",
  color: vars.color.main,
  fontWeight: vars.fontWeight.bold,
});

export const help = style({
  fontSize: "14px",
  color: vars.color.gray200,
  lineHeight: "1.6",
});

export const error = style({
  fontSize: "14px",
  color: vars.color.red,
  lineHeight: "1.6",
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
