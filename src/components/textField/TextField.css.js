import { style } from "@vanilla-extract/css";
import { fontWeight, vars } from "@/styles/theme.css";

export const inputWrapper = style({
  display: "flex",
  alignItems: "center",
});

export const input = style({
  width: "100%",
  background: vars.color.black,
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: 2,
  padding: "20px 18px",
  outline: "none",
  fontWeight: fontWeight.light,
  color: vars.color.white,
  selectors: {
    "&::placeholder": {
      color: vars.color.gray200,
    },
  },
});

export const inputError = style([
  input,
  {
    borderColor: vars.color.red,
  },
]);

export const suffix = style({
  marginLeft: 8,
});
