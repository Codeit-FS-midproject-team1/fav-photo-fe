import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";

export const section = style({
  width: "100%",
  minWidth: 0,
  color: vars.color.white,
});

export const title = style({
  marginBottom: 24,
  fontFamily: vars.font.br,
  fontSize: vars.fontSize.heading2,

  "@media": {
    [media.mobile]: {
      fontSize: 26,
      marginBottom: 16,
    },
  },
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  margin: 0,
  padding: 0,
  listStyle: "none",

  "@media": {
    [media.mobile]: {
      gap: 16,
    },
  },
});

export const item = style({
  minWidth: 0,
  padding: 24,
  backgroundColor: "#1B1B1B",
  border: `1px solid ${vars.color.gray100}`,

  "@media": {
    [media.mobile]: {
      padding: 16,
    },
  },
});

export const article = style({
  display: "grid",
  gridTemplateColumns: "minmax(200px, 260px) minmax(0, 1fr)",
  gap: 32,
  alignItems: "start",
  minWidth: 0,

  "@media": {
    [media.tabletOnly]: {
      gridTemplateColumns: "minmax(160px, 220px) minmax(0, 1fr)",
      gap: 20,
    },
    [media.mobile]: {
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: 20,
    },
  },
});

export const cardWrapper = style({
  width: "100%",
  minWidth: 0,
  maxWidth: 260,

  "@media": {
    [media.mobile]: {
      maxWidth: 240,
      margin: "0 auto",
    },
  },
});

export const detail = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  minWidth: 0,
  height: "100%",
});

export const status = style({
  display: "inline-block",
  padding: "6px 12px",
  border: `1px solid ${vars.color.gray300}`,
  color: vars.color.white,
  fontSize: 14,
});

export const description = style({
  lineHeight: 1.6,
  overflowWrap: "anywhere",
  whiteSpace: "pre-wrap",
});

export const secondaryText = style({
  color: vars.color.gray300,
  fontSize: 14,
});

export const actions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  marginTop: "auto",
  paddingTop: 16,

  "@media": {
    [media.mobile]: {
      flexDirection: "column",
      gap: 8,
    },
  },
});

export const actionButton = style({
  minHeight: 44,
  padding: "10px 24px",
  border: `1px solid ${vars.color.gray300}`,
  backgroundColor: "transparent",
  color: vars.color.white,
  cursor: "pointer",

  "@media": {
    [media.mobile]: {
      width: "100%",
    },
  },
});

export const emptyMessage = style({
  padding: "60px 16px",
  textAlign: "center",
  color: vars.color.gray300,
});
