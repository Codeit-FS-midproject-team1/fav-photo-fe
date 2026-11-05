import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

const chip = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  wordBreak: "keep-all",
  overflowWrap: "anywhere",
  padding: "4px 10px",
  borderRadius: "2px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: vars.color.white,
};

export const onSale = style([
  chip,
  {
    color: vars.color.white,
  },
]);

export const offered = style([
  chip,
  {
    color: vars.color.main,
  },
]);
