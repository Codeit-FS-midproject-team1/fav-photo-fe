import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media, responsiveWidths } from "@/styles/responsive.css";

export const widths = {
  responsive: style({
    ...responsiveWidths.desktop,
    "@media": {
      [media.tabletOnly]: responsiveWidths.tablet,
      [media.mobile]: responsiveWidths.mobile,
    },
  }),

  XS: style({
    width: 150,
  }),
};

export const heights = {
  thick: style({ height: 80 }),
  thin: style({ height: 60 }),
  compact: style({ height: 40 }),
};

export const button = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid transparent",
  fontFamily: "inherit",
  fontWeight: vars.fontWeight.bold,
  textDecoration: "none",
  whiteSpace: "nowrap",
  cursor: "pointer",
  fontSize: "1rem",
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
