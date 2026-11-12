import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";

export const content = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
  width: "100%",
  maxWidth: 440,
  margin: "0 auto",
  padding: "32px 8px 16px",
  color: vars.color.white,

  "@media": {
    [media.mobile]: {
      gap: 16,
      padding: "32px 12px 24px",
    },
  },
});

export const eyebrow = style({
  fontFamily: vars.font.br,
  fontSize: 20,
  color: vars.color.gray300,
  textAlign: "center",

  "@media": {
    [media.mobile]: {
      fontSize: 16,
    },
  },
});

export const title = style({
  fontFamily: vars.font.br,
  fontSize: 36,
  lineHeight: 1.3,
  color: vars.color.white,
  textAlign: "center",

  "@media": {
    [media.mobile]: {
      fontSize: 26,
    },
  },
});

export const titleAccent = style({
  color: "#EFFF00",
});

export const description = style({
  fontSize: 16,
  lineHeight: 1.6,
  color: vars.color.gray200,
  textAlign: "center",

  "@media": {
    [media.mobile]: {
      fontSize: 14,
    },
  },
});

export const giftBox = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 200,
  height: 200,
  margin: "12px 0",
  border: "none",
  borderRadius: 20,
  background: vars.color.black,

  "@media": {
    [media.mobile]: {
      width: 150,
      height: 150,
      margin: "8px 0",
    },
  },
});

export const usage = style({
  width: "100%",
  padding: "12px 16px",
  border: `1px solid ${vars.color.gray400}`,
  borderRadius: 8,
  fontSize: 15,
  lineHeight: 1.5,
  color: vars.color.gray200,
  textAlign: "center",

  "@media": {
    [media.mobile]: {
      fontSize: 13,
    },
  },
});

export const result = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
  width: "100%",
  padding: "20px 16px",
  border: `1px solid ${vars.color.gray400}`,
  borderRadius: 8,
  fontSize: 15,
  textAlign: "center",

  "@media": {
    [media.mobile]: {
      fontSize: 14,
      padding: "16px 12px",
    },
  },
});

export const error = style({
  width: "100%",
  fontSize: 14,
  lineHeight: 1.5,
  color: "#FF6B6B",
  textAlign: "center",
});

export const drawButton = style({
  width: "100%",
  minWidth: 0,
  marginTop: 8,
});

export const notice = style({
  fontSize: 13,
  lineHeight: 1.6,
  color: vars.color.gray300,
  textAlign: "center",

  "@media": {
    [media.mobile]: {
      fontSize: 12,
    },
  },
});

globalStyle(`${giftBox} svg`, {
  width: 160,
  height: 160,

  "@media": {
    [media.mobile]: {
      width: 104,
      height: 104,
    },
  },
});

globalStyle(`${giftBox} img`, {
  width: 160,
  height: 160,
  objectFit: "contain",

  "@media": {
    [media.mobile]: {
      width: 104,
      height: 104,
    },
  },
});

globalStyle(`${usage} strong`, {
  color: "#EFFF00",
  fontWeight: 700,
});

globalStyle(`${result} strong`, {
  fontSize: 36,
  fontWeight: 700,
  color: "#EFFF00",
});
