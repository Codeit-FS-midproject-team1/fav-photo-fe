import { fontWeight, vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const content = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 45,
});

export const title = style({
  fontSize: 20,
  fontWeight: 700,
  textAlign: "center",
  color: vars.color.white,
});

export const message = style({
  marginBottom: 15,
  lineHeight: 1.5,
  textAlign: "center",
  whiteSpace: "pre-line",
  color: vars.color.gray300,
  wordBreak: "keep-all",
});

export const confirmButton = style({
  display: "block",
  height: 60,
  width: 170,
  border: "none",
  margin: "0 auto",
  borderRadius: 2,
  background: vars.color.main,
  color: vars.color.black,
  fontSize: 16,
  fontWeight: fontWeight.bold,
  cursor: "pointer",
});
