import { style } from "@vanilla-extract/css";

// 시안 PC: 3열, 카드 사이 80
export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 80,
});
