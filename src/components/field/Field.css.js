import { style } from "@vanilla-extract/css";
import { fontWeight, vars } from "@/styles/theme.css";

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const label = style({
  color: vars.color.black,
  fontSize: 18,
});

export const error = style({
  marginTop: -5, // 간격 5px로 조정
  color: vars.color.red,
  fontWeight: fontWeight.light,
});
