import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";

export const title = style({
  margin: "0 0 24px",
  fontSize: 24,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.white,
  "@media": {
    [media.mobile]: { margin: "0 0 16px", fontSize: 18 },
  },
});

// 사진보다 칸이 넓거나 높을 때 남는 부분은 검은 배경으로
export const imageBox = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: vars.color.black,
});

// 사진 비율을 그대로 두고, 화면 안에 다 들어오도록 줄이기만 한다
export const image = style({
  display: "block",
  width: "auto",
  height: "auto",
  maxWidth: "100%",
  maxHeight: "65vh",
  objectFit: "contain",
  "@media": {
    [media.mobile]: { maxHeight: "50vh" }, // 설명까지 한 화면에 들어오게
  },
});

// 카드 설명: 생성할 때 넣은 줄바꿈을 그대로 보여 준다
export const description = style({
  margin: "10px 0 0",
  fontSize: 20,
  lineHeight: 1.6,
  color: vars.color.gray200,
  whiteSpace: "pre-line",
  wordBreak: "keep-all",
  overflowWrap: "anywhere",
  "@media": {
    [media.mobile]: { margin: "16px 0 0", fontSize: 14 },
  },
});

export const descriptionBox = style({
  display: "flex",
  justifyContent: "center",
  padding: "0 10px 0",
});
