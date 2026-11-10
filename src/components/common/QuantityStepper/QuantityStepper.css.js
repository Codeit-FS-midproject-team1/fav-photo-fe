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
  padding: 0,

  border: `1px solid ${vars.color.gray300}`,
  borderRadius: "8px",

  backgroundColor: vars.color.gray100,
  color: vars.color.black,

  fontFamily: vars.font.notoSans,
  fontSize: "22px",
  fontWeight: vars.fontWeight.bold,

  cursor: "pointer",

  selectors: {
    "&:hover:not(:disabled)": {
      backgroundColor: vars.color.gray200,
    },

    "&:focus-visible": {
      outline: `2px solid ${vars.color.main}`,
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

  fontFamily: vars.font.notoSans,
  fontSize: vars.fontSize.body,
  fontWeight: vars.fontWeight.bold,

  textAlign: "center",
  fontVariantNumeric: "tabular-nums",
});
