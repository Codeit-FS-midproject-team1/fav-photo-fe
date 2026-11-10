import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const label = style({
  color: vars.color.white,
  fontSize: 18,
});

export const error = style({
  minHeight: 24,
  color: vars.color.red,
  fontWeight: vars.fontWeight.light,
});

export const errorHidden = style({
  visibility: "hidden",
});