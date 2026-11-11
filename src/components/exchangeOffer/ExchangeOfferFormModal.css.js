import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: 28,
  width: "100%",
  minWidth: 0,
  color: vars.color.white,

  "@media": {
    [media.mobile]: {
      gap: 20,
    },
  },
});

export const header = style({
  paddingBottom: 20,
  borderBottom: `2px solid ${vars.color.gray100}`,

  "@media": {
    [media.mobile]: {
      paddingBottom: 12,
    },
  },
});

export const eyebrow = style({
  fontFamily: vars.font.br,
  fontSize: vars.fontSize.bodyLarge,
  color: vars.color.gray300,

  "@media": {
    [media.mobile]: {
      fontSize: 14,
    },
  },
});

export const title = style({
  marginTop: 16,
  fontFamily: vars.font.br,
  fontSize: vars.fontSize.heading2,
  fontWeight: vars.fontWeight.regular,
  color: vars.color.white,

  "@media": {
    [media.mobile]: {
      marginTop: 8,
      fontSize: 26,
    },
  },
});

export const content = style({
  display: "grid",
  gridTemplateColumns: "minmax(270px, 300px) minmax(0, 1fr)",
  gap: 32,
  alignItems: "start",

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

export const cardSection = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  minWidth: 0,

  "@media": {
    [media.mobile]: {
      gap: 12,
    },
  },
});

export const sectionTitle = style({
  fontSize: 18,
  fontWeight: 600,
  color: vars.color.white,

  "@media": {
    [media.mobile]: {
      fontSize: 14,
    },
  },
});

export const cardPreview = style({
  width: "100%",
  maxWidth: 300,

  "@media": {
    [media.mobile]: {
      maxWidth: 200,
    },
  },
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  minWidth: 0,

  "@media": {
    [media.mobile]: {
      gap: 20,
    },
  },
});

export const error = style({
  fontSize: 14,
  color: "#FF6B6B",
});

export const actions = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 12,
  marginTop: 8,

  "@media": {
    [media.mobile]: {
      gap: 8,
    },
  },
});

export const actionButton = style({
  width: "100%",
  minWidth: 0,
});
