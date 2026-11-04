import { style } from "@vanilla-extract/css";
import { fontWeight, vars } from "@/styles/theme.css";

export const page = style({
  minHeight: "calc(100vh - 81px)",
  padding: "100px 24px 160px",
  backgroundColor: vars.color.black,

  "@media": {
    "screen and (max-width: 768px)": {
      padding: "48px 20px 100px",
    },
  },
});

export const container = style({
  width: "100%",
  maxWidth: 520,
  margin: "0 auto",
});

export const title = style({
  margin: "0 0 60px",
  color: vars.color.white,
  fontSize: 40,
  fontWeight: vars.fontWeight.bold,

  "@media": {
    "screen and (max-width: 768px)": {
      marginBottom: 40,
      fontSize: 32,
    },
  },
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: 32,
});

export const fieldContent = style({
  minHeight: 60,
  display: "flex",
  alignItems: "center",
  padding: "0 18px",
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: 2,
  color: vars.color.white,
  fontWeight: vars.fontWeight.light,
});
