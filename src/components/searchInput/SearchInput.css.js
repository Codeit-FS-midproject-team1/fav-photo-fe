import { style } from "@vanilla-extract/css";
import { fontWeight, vars } from "@/styles/theme.css";

export const form = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  width: "100%",
  maxWidth: 320,
  height: 50,
  padding: "0 20px",
  background: vars.color.black,
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: 2,
  selectors: {
    // 입력 중일 때 테두리를 흰색으로 바꿔 포커스 위치를 보여준다
    "&:focus-within": {
      borderColor: vars.color.white,
    },
  },
});

export const input = style({
  flex: 1,
  minWidth: 0,
  padding: 0,
  background: "none",
  border: 0,
  outline: "none",
  color: vars.color.white,
  font: "inherit",
  fontSize: 16,
  selectors: {
    "&::placeholder": {
      color: vars.color.gray200,
      fontWeight: fontWeight.light,
    },
  },
});

export const button = style({
  display: "flex",
  padding: 0,
  background: "none",
  border: 0,
  cursor: "pointer",
});
