import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css.js";
import { media } from "@/styles/responsive.css.js";

export const content = style({
  width: "100%",
  maxWidth: "760px",
  minWidth: 0,
  margin: "0 auto",
  boxSizing: "border-box",

  color: vars.color.white,
  fontFamily: vars.font.notoSans,
});

export const header = style({
  marginBottom: "12px",
});

export const title = style({
  margin: 0,
  paddingRight: "24px",
  color: vars.color.white,
  fontSize: "24px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: 1.4,
});

export const subtitle = style({
  margin: "8px 0 0",
  color: vars.color.gray300,
  fontSize: "14px",
  overflowWrap: "anywhere",
});

export const form = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  width: "100%",
  minWidth: 0,
  gap: "14px",
});

// 판매 수량 + 판매 가격
export const topFields = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  alignItems: "start",
  gap: "18px",

  "@media": {
    [media.mobile]: {
      gridTemplateColumns: "1fr",
    },
  },
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  minWidth: 0,
});

export const fieldset = style({
  display: "grid",
  justifyItems: "start",
  gap: "8px",
  minWidth: 0,
  margin: 0,
  padding: 0,
  border: 0,
});

export const label = style({
  color: vars.color.gray200,
  fontSize: "16px",
  fontWeight: vars.fontWeight.bold,
});

const controlBase = {
  boxSizing: "border-box",
  width: "100%",
  minWidth: 0,
  minHeight: "48px",
  padding: "12px",

  border: `1px solid ${vars.color.gray400}`,
  borderRadius: "8px",

  backgroundColor: vars.color.black,
  color: vars.color.white,

  fontFamily: vars.font.notoSans,
  fontSize: "16px",

  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${vars.color.main}`,
      outlineOffset: "2px",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
};

export const input = style(controlBase);

export const textarea = style({
  ...controlBase,
  minHeight: "80px",
  resize: "vertical",
  overflowWrap: "anywhere",
});

export const columns = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "16px",

  "@media": {
    [media.mobile]: {
      gridTemplateColumns: "1fr",
    },
  },
});

export const help = style({
  margin: 0,
  color: vars.color.gray300,
  fontSize: "13px",
});

export const count = style({
  alignSelf: "flex-end",
  margin: 0,
  color: vars.color.gray300,
  fontSize: "13px",
});

export const error = style({
  margin: 0,
  color: vars.color.red,
  fontSize: "14px",
  lineHeight: 1.5,
  overflowWrap: "anywhere",
});

export const footer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  width: "100%",
  minWidth: 0,
  gap: "12px",
  marginTop: 0,

  "@media": {
    [media.mobile]: {
      gap: "8px",
    },
  },
});

export const actionButton = style({
  width: "100%",
  minWidth: 0,
  maxWidth: "100%",
  boxSizing: "border-box",
  padding: "0 12px",
  fontSize: "16px",
});
