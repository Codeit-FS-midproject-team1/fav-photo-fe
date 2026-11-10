import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css.js";

export const state = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  minHeight: "60vh",
  padding: "24px",
  color: vars.color.gray200,
  textAlign: "center",
});
