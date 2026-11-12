import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css.js";
import { media } from "@/styles/responsive.css.js";

export const container = style({
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 24px",
  boxSizing: "border-box",

  color: vars.color.white,
  fontFamily: vars.font.notoSans,

  "@media": {
    [media.mobile]: {
      padding: "24px 16px",
    },
  },
});

export const main = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
  alignItems: "start",
  gap: "48px",

  "@media": {
    [media.tabletOnly]: {
      gap: "28px",
    },

    [media.mobile]: {
      gridTemplateColumns: "1fr",
      gap: "32px",
    },
  },
});

// 포토카드 이미지 영역
export const mediaFrame = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "100%",
  aspectRatio: "3 / 4",
  overflow: "hidden",
  borderRadius: "4px",

  backgroundColor: vars.color.gray500,
});

export const mediaImage = style({
  width: "100%",
  height: "100%",

  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

export const mediaPlaceholder = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "100%",
  height: "100%",

  color: vars.color.gray300,
  fontSize: "16px",
  textAlign: "center",
});

// 상세 정보 영역
export const detail = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginBottom: "15px",
});

export const title = style({
  margin: 0,

  color: vars.color.white,
  fontSize: "32px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: 1.4,
  overflowWrap: "anywhere",

  "@media": {
    [media.mobile]: {
      fontSize: "24px",
    },
  },
});

export const tags = style({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "8px",
});

export const tag = style({
  display: "inline-flex",
  alignItems: "center",

  padding: "6px 12px",

  border: `1px solid ${vars.color.gray400}`,
  borderRadius: "4px",

  color: vars.color.gray200,
  backgroundColor: vars.color.gray500,

  fontSize: "14px",
  fontWeight: vars.fontWeight.regular,
});

// 기본 상세 정보
export const infoList = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",

  margin: 0,
  padding: "0 0 28px",

  borderBottom: `1px solid ${vars.color.gray400}`,
});

export const infoRow = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "16px",
  minWidth: 0,
});

export const infoLabel = style({
  flexShrink: 0,

  color: vars.color.gray300,
  fontSize: "16px",
  fontWeight: vars.fontWeight.regular,
});

export const infoValue = style({
  minWidth: 0,
  margin: 0,

  color: vars.color.white,
  fontSize: "18px",
  fontWeight: vars.fontWeight.regular,

  textAlign: "right",
  overflowWrap: "anywhere",
});

export const price = style({
  margin: 0,

  color: vars.color.main,
  fontSize: "24px",
  fontWeight: vars.fontWeight.bold,

  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
});

// 교환 희망 정보
export const exchangeSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",

  marginTop: "28px",
});

export const sectionTitle = style({
  margin: 0,

  color: vars.color.white,
  fontSize: "20px",
  fontWeight: vars.fontWeight.bold,
});

export const exchangeList = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",

  margin: 0,
  padding: 0,
});

export const descriptionBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",

  padding: "20px",

  borderRadius: "4px",
  backgroundColor: vars.color.gray500,
});

export const descriptionTitle = style({
  margin: 0,

  color: vars.color.gray200,
  fontSize: "16px",
  fontWeight: vars.fontWeight.bold,
});

export const exchangeDescription = style({
  margin: 0,

  color: vars.color.gray300,
  fontSize: "16px",
  lineHeight: 1.6,

  // 사용자가 입력한 줄바꿈과 공백 유지
  whiteSpace: "pre-wrap",

  // 긴 문자열로 인한 레이아웃 깨짐 방지
  overflowWrap: "anywhere",
});

// 구매/판매 관리 버튼
export const actions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",

  marginTop: "32px",

  "@media": {
    [media.mobile]: {
      flexDirection: "column",
    },
  },
});

// 아래 추가 콘텐츠
export const extraContent = style({
  marginTop: "64px",
  paddingTop: "32px",

  borderTop: `1px solid ${vars.color.gray400}`,

  "@media": {
    [media.mobile]: {
      marginTop: "40px",
    },
  },
});
// 포토카드 설명
export const cardDescription = style({
  margin: "12px 0 20px",
  color: vars.color.gray300,
  fontSize: "14px",
  lineHeight: 1.6,
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
});
