import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css.js";

export const root = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
});

export const button = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "44px",
  height: "44px",
  border: `1px solid ${vars.color.gray300}`,
  borderRadius: "8px",
  backgroundColor: vars.color.gray100,
  color: vars.color.black,
  fontSize: "22px",
  cursor: "pointer",
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${vars.color.black}`,
      outlineOffset: "2px",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const value = style({
  minWidth: "3ch",
  color: "inherit",
  fontSize: "18px",
  fontWeight: vars.fontWeight.bold,
  textAlign: "center",
  fontVariantNumeric: "tabular-nums",
});
