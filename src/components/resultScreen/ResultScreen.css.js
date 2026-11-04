import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const screen = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "calc(100vh - 81px)", 
  backgroundColor: vars.color.black,
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 40,
  color: vars.color.white,
  textAlign: "center",
});

export const title = style({
  fontSize: 46,
  fontWeight: vars.fontWeight.regular,
  fontFamily: vars.font.br,
});

export const success = style({
  color: vars.color.main,
});

export const failure = style({
  color: vars.color.gray300,
});

export const message = style({
  color: vars.color.white,
  fontSize: 20,
  fontWeight: vars.fontWeight.bold,
  whiteSpace: "pre-line",
  wordBreak: "keep-all",
});

export const actionButton = style({
  marginTop: 12,
  fontSize: 18,
});
