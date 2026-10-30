import { style } from "@vanilla-extract/css";
import { vars, fontWeight } from "@/styles/theme.css";

export const textarea = style({
  width: "100%",
  minHeight: 180,
  background: vars.color.black,
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: 2,
  padding: "20px 18px",
  outline: "none",
  resize: "none",
  fontWeight: fontWeight.light,
  color: vars.color.white,
  selectors: {
    "&::placeholder": {
      color: vars.color.gray200,
    },
  },
});

export const textareaError = style([
  textarea,
  {
    borderColor: vars.color.red,
  },
]);

export const counter = style({
  alignSelf: "flex-end",
  margin: 0,
  color: vars.color.gray400,
  fontSize: 12,
});
