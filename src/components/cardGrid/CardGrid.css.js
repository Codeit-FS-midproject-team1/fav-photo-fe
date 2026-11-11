import { style } from "@vanilla-extract/css";
import { media } from "@/styles/responsive.css";

// 시안: PC 3열 간격 80 · 태블릿 2열 간격 20 · 모바일 2열 간격 5
export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 80,
  "@media": {
    [media.tabletOnly]: { gridTemplateColumns: "repeat(2, 1fr)", gap: 20 },
    [media.mobile]: { gridTemplateColumns: "repeat(2, 1fr)", gap: 5 },
  },
});
