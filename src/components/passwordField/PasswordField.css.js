import { style } from "@vanilla-extract/css";
import { vars, fontWeight} from "@/styles/theme.css";

export const inputWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
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

export const toggleButton = style({
  position: "absolute",
  top: "50%",
  right: 21,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: 0,
  background: "transparent",
  cursor: "pointer",
  transform: "translateY(-50%)",
});
