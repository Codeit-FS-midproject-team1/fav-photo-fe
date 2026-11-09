import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";

// 헤더: "마이갤러리" + 큰 제목 + 밑줄
export const header = style({
  paddingBottom: 20,
  borderBottom: `2px solid ${vars.color.gray100}`,
  "@media": { [media.mobile]: { paddingBottom: 12 } },
});

export const eyebrow = style({
  fontFamily: vars.font.br,
  fontSize: vars.fontSize.bodyLarge, // 24px
  color: vars.color.gray300,
  "@media": { [media.mobile]: { fontSize: 14 } },
});

export const title = style({
  marginTop: 16,
  fontFamily: vars.font.br,
  fontSize: vars.fontSize.heading2, // 46px
  fontWeight: vars.fontWeight.regular,
  color: vars.color.white,
  "@media": { [media.mobile]: { marginTop: 8, fontSize: 26 } },
});

// 툴바: 검색창 + 필터 2개
export const toolbar = style({
  display: "flex",
  alignItems: "center",
  gap: 50,
  margin: "20px 0 40px",
  "@media": {
    [media.mobile]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: 12,
      margin: "16px 0 20px",
    },
  },
});

export const filters = style({
  display: "flex",
  gap: 30,
});

// 목록: PC 3열, 태블릿·모바일 2열
export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 40,
  "@media": {
    [media.tabletOnly]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: 20,
    },
    [media.mobile]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: 5,
    },
  },
});

// 불러오는 중, 빈 목록, 에러 문구
export const message = style({
  padding: "80px 0",
  textAlign: "center",
  fontSize: vars.fontSize.body,
  color: vars.color.gray300,
});
