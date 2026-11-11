import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";

// 간격은 마이 갤러리와 맞춤
export const page = style({
  padding: "60px 0 120px",
  "@media": {
    [media.tabletOnly]: { paddingTop: 40 },
    [media.mobile]: { padding: "20px 0 140px" },
  },
});

export const title = style({
  "@media": {
    [media.mobile]: { display: "none" },
  },
});

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 30,
  marginTop: 20,
  "@media": {
    [media.mobile]: { flexWrap: "wrap", gap: 10, marginTop: 0 },
  },
});

export const searchAndFilters = style({
  display: "flex",
  flex: 1,
  minWidth: 0,
  alignItems: "center",
  gap: 60,
  "@media": {
    [media.tabletOnly]: { gap: 30 },
    // 검색창과 필터를 툴바의 직접 자식처럼 배치해 줄을 나눈다
    [media.mobile]: { display: "contents" },
  },
});

// 좁은 화면에서는 검색창이 줄어들어 필터·정렬이 한 줄에 들어가게 한다
export const search = style({
  flex: "0 1 320px",
  minWidth: 0,
  "@media": {
    [media.mobile]: { flexBasis: "100%" },
  },
});

globalStyle(`${search} > form`, {
  "@media": {
    [media.mobile]: { maxWidth: "none" },
  },
});

export const list = style({
  marginTop: 60,
  "@media": {
    [media.tabletOnly]: { marginTop: 40 },
    [media.mobile]: { marginTop: 20 },
  },
});

export const message = style({
  display: "block",
  padding: "80px 0",
  color: vars.color.gray300,
  textAlign: "center",
});

// 모바일에서만 화면 아래에 떠 있는 판매하기 버튼
export const mobileSell = style({
  display: "none",
  "@media": {
    [media.mobile]: {
      display: "block",
      position: "fixed",
      left: "50%",
      bottom: 40,
      zIndex: 10,
      transform: "translateX(-50%)",
    },
  },
});
