import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";

export const content = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 24,
  width: "100%",
  padding: "32px 0 16px",
  textAlign: "center",
  color: vars.color.white,

  "@media": {
    [media.mobile]: {
      gap: 20,
      padding: "24px 0 12px",
    },
  },
});

export const title = style({
  fontFamily: vars.font.br,
  fontSize: 30,
  lineHeight: 1.3,

  "@media": {
    [media.mobile]: {
      fontSize: 22,
    },
  },
});

export const message = style({
  fontSize: 16,
  lineHeight: 1.6,
  color: vars.color.gray300,

  "@media": {
    [media.mobile]: {
      fontSize: 14,
    },
  },
});

export const error = style({
  fontSize: 14,
  lineHeight: 1.5,
  color: "#FF6B6B",
});

export const actions = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 12,
  width: "100%",
  marginTop: 16,

  "@media": {
    [media.mobile]: {
      gap: 8,
      marginTop: 8,
    },
  },
});

export const button = style({
  width: "100%",
  minWidth: 0,
});
