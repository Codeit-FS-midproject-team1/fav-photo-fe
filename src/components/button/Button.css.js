import { style } from "@vanilla-extract/css";
import { fontWeight, vars } from "@/styles/theme.css";

export const widths = {
  L: style({ width: 520 }),
  M: style({ width: 440 }),
  S: style({ width: 345 }),
  XS: style({ width: 150 }),
};

export const heights = {
  thick: style({ height: 80 }),
  thin: style({ height: 60 }),
};

export const button = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid transparent",
  fontFamily: "inherit",
  fontWeight: fontWeight.bold,
  whiteSpace: "nowrap",
  cursor: "pointer",
  selectors: {
    "&:disabled": {
      backgroundColor: vars.color.gray200,
      borderColor: vars.color.gray200,
      color: vars.color.gray400,
      cursor: "not-allowed",
    },
  },
});

export const primary = style({
  backgroundColor: vars.color.main,
  borderColor: vars.color.main,
  color: vars.color.black,
});

export const secondary = style({
  backgroundColor: vars.color.black,
  borderColor: vars.color.gray100,
  color: vars.color.white,
  borderRadius: 2,
});
