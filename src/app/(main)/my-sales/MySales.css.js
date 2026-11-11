import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";

export const page = style({
  padding: "60px 0 140px",
  "@media": {
    [media.mobile]: { padding: "20px 0 60px" },
  },
});

/* ---------- 보유 요약 ---------- */

export const summary = style({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  padding: "40px 0 30px",
  borderBottom: `1px solid ${vars.color.gray400}`,
  "@media": {
    [media.mobile]: { gap: 15, padding: "20px 0" },
  },
});

export const owner = style({
  fontSize: vars.fontSize.bodyLarge, // 24px
  fontWeight: vars.fontWeight.bold,
  color: vars.color.white,
  "@media": {
    [media.mobile]: { fontSize: 14 },
  },
});

export const total = style({
  marginLeft: 8,
  fontSize: 20,
  fontWeight: vars.fontWeight.regular,
  color: vars.color.gray300,
  "@media": {
    [media.mobile]: { fontSize: 12 },
  },
});

export const chips = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 20,
  margin: 0,
  padding: 0,
  listStyle: "none",
  "@media": {
    [media.mobile]: { gap: 10 },
  },
});

const chipBase = {
  display: "flex",
  gap: 6,
  padding: "8px 16px",
  border: "1px solid currentColor",
  borderRadius: 2,
  fontSize: 18,
  fontWeight: vars.fontWeight.light,
  "@media": {
    [media.mobile]: { padding: "5px 10px", fontSize: 12 },
  },
};

export const chip = styleVariants({
  PHOTO: { ...chipBase, color: vars.color.main },
  CRAFT: { ...chipBase, color: vars.color.blue },
  AI: { ...chipBase, color: vars.color.purple },
  ETC: { ...chipBase, color: vars.color.pink },
});

/* ---------- 검색·필터·정렬 ---------- */

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  gap: 60,
  margin: "20px 0 60px",
  "@media": {
    [media.tabletOnly]: { gap: 30 },
    [media.mobile]: {
      flexWrap: "wrap", // 패널을 다음 줄로 내린다
      gap: 10,
      margin: "15px 0 25px",
    },
  },
});

// 모바일에서만 보이는 필터 아이콘 버튼
export const filterToggle = style({
  display: "none",
  "@media": {
    [media.mobile]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      width: 50,
      height: 50,
      padding: 0,
      background: vars.color.black,
      border: `1px solid ${vars.color.gray200}`,
      borderRadius: 2,
      cursor: "pointer",
    },
  },
});

export const search = style({
  "@media": {
    [media.mobile]: { flex: 1, minWidth: 0 },
  },
});

// PC·태블릿: 검색창 오른쪽 전체, 필터는 왼쪽·정렬은 오른쪽 끝
export const panel = style({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 20,
  "@media": {
    [media.mobile]: {
      display: "none",
      flexBasis: "100%", // 한 줄 전체를 차지해 다음 줄로 내려간다
      flexWrap: "wrap",
      gap: 10,
      padding: "15px",
      background: vars.color.black,
      border: `1px solid ${vars.color.gray200}`,
      borderRadius: 2,
    },
  },
});

// 모바일에서 필터 버튼으로 연 상태
export const panelOpen = style({
  "@media": {
    [media.mobile]: { display: "flex" },
  },
});

// 필터 글자가 두 줄로 접히지 않게 한다
export const filters = style({
  flexShrink: 0,
  whiteSpace: "nowrap",
});

// 모바일: 제작방식·장르 사이 간격을 줄여 정렬까지 한 줄에 들어가게 한다
globalStyle(`${filters} > div`, {
  "@media": {
    [media.mobile]: { gap: 20 },
  },
});

// 모바일: 정렬 드롭다운을 필터처럼 테두리 없는 글자 버튼으로 보이게 한다
export const sortBox = style({
  flexShrink: 0,
  whiteSpace: "nowrap",
});

// 드롭다운 바깥 상자: 너비 180 고정을 푼다
globalStyle(`${sortBox} > div`, {
  "@media": {
    [media.mobile]: { width: "auto" },
  },
});

// 드롭다운 버튼: 테두리·배경·높이를 없애고 필터와 같은 글자 모양
globalStyle(`${sortBox} > div > button`, {
  "@media": {
    [media.mobile]: {
      gap: 10,
      height: "auto",
      padding: 0,
      border: 0,
      background: "none",
      color: vars.color.gray200,
      fontWeight: vars.fontWeight.bold,
    },
  },
});

// 펼친 메뉴: 화면 오른쪽 밖으로 나가지 않게 오른쪽 끝에 맞춘다
globalStyle(`${sortBox} > div > ul`, {
  "@media": {
    [media.mobile]: {
      top: "calc(100% + 18px)",
      left: "auto",
      right: 0,
      width: "max-content",
    },
  },
});

/* ---------- 카드 목록 ---------- */

// PC 3열, 태블릿·모바일 2열 (공용 CardGrid 는 3열 고정이라 여기서 따로 잡는다)
export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 80,
  marginBottom: 60,
  "@media": {
    [media.tabletOnly]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: 20,
    },
    [media.mobile]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: 5,
      marginBottom: 30,
    },
  },
});

// 불러오는 중, 오류, 빈 목록 문구
export const message = style({
  padding: "100px 0",
  textAlign: "center",
  fontSize: vars.fontSize.body,
  color: vars.color.gray300,
});
