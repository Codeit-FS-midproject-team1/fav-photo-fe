import { style } from "@vanilla-extract/css";
import { fontWeight, vars } from "@/styles/theme.css";

export const page = style({
  minHeight: "calc(100vh - 81px)",
  backgroundColor: vars.color.black,
  padding: "100px 24px 160px",

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
  margin: "0 220px 80px",
  color: vars.color.white,
  fontSize: "3.875rem",
  fontWeight: fontWeight.regular,
  fontFamily: "var(--font-br-b)",

  "@media": {
    "screen and (max-width: 768px)": {
      marginBottom: "3rem",
      fontSize: 36,
    },
  },
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: 34,
});

export const uploadRow = style({
  display: "flex",
  gap: 18,

  "@media": {
    "screen and (max-width: 767px)": {
      flexDirection: "column",
    },
  },
});

export const fileNameBox = style({
  flex: 1,
  minHeight: 60,
  display: "flex",
  alignItems: "center",
  padding: "0 18px",
  border: `1px solid ${vars.color.gray200}`,
  color: vars.color.gray300,
});

export const fileButton = style({
  width: 150,
  border: `1px solid ${vars.color.main}`,
  backgroundColor: vars.color.black,
  color: vars.color.main,
  fontSize: 16,
  cursor: "pointer",

  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
      minHeight: 60,
    },
  },
});

export const hiddenInput = style({
  display: "none",
});

export const previewBox = style({
  minHeight: 180,
  display: "flex",
  alignItems: "center",
  padding: 0,
  border: `1px solid ${vars.color.gray200}`,
});

export const emptyPreview = style({
  width: 180,
  height: 135,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: vars.color.gray200,
  color: vars.color.black,
});

export const previewImage = style({
  width: 180,
  height: 135,
  objectFit: "contain",
});

export const input = style({
  width: "100%",
  minHeight: 60,
  padding: "0 18px",
  outline: "none",
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: 2,
  backgroundColor: vars.color.black,
  color: vars.color.white,
  fontSize: 16,
  fontFamily: "inherit",

  selectors: {
    "&::placeholder": {
      color: vars.color.gray300,
    },
  },
});

export const select = style([
  input,
  {
    appearance: "none",
    cursor: "pointer",
  },
]);

export const selectWrapper = style({
  position: "relative",
  width: "100%",
});

export const selectIcon = style({
  position: "absolute",
  top: "50%",
  right: 18,
  display: "flex",
  alignItems: "center",
  transform: "translateY(-50%)",
  pointerEvents: "none",
});

export const inputError = style([
  input,
  {
    borderColor: vars.color.red,
  },
]);

export const textarea = style({
  width: "100%",
  minHeight: 220,
  padding: 18,
  resize: "vertical",
  outline: "none",
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: 2,
  backgroundColor: vars.color.black,
  color: vars.color.white,
  fontSize: 16,
  fontFamily: "inherit",

  selectors: {
    "&::placeholder": {
      color: vars.color.gray300,
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
  margin: "-22px 12px 0 0",
  color: vars.color.gray300,
  fontSize: 14,
});

export const submitButton = style({
  width: "100%",
  height: 70,
  marginTop: 30,
  border: "none",
  borderRadius: 2,
  backgroundColor: vars.color.main,
  color: vars.color.black,
  fontSize: 20,
  fontWeight: fontWeight.bold,
  cursor: "pointer",

  selectors: {
    "&:hover": {
      opacity: 0.85,
    },
  },
});
