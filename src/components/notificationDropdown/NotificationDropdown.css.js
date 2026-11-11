import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";

export const root = style({ position: "relative", display: "flex" });

export const bell = style({
  display: "flex",
  padding: 0,
  background: "none",
  border: 0,
  cursor: "pointer",
});

export const panel = style({
  position: "absolute",
  top: "100%",
  right: 0,
  zIndex: 20,
  width: 300,
  maxHeight: 535,
  overflowY: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: `${vars.color.gray400} transparent`,
  background: vars.color.gray500,
  borderRadius: 2,
  "@media": {
    // 시안 모바일: 화면 전체를 덮는 알림 페이지
    [media.mobile]: {
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      width: "100%",
      maxHeight: "none",
      background: vars.color.black,
      borderRadius: 0,
    },
  },
});

// 모바일에서만 보이는 위쪽 막대 (뒤로 가기 + "알림")
export const mobileBar = style({
  display: "none",
  "@media": {
    [media.mobile]: {
      position: "sticky",
      top: 0,
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 60,
      background: vars.color.black,
    },
  },
});

export const back = style({
  position: "absolute",
  left: 15,
  display: "flex",
  padding: 0,
  background: "none",
  border: 0,
  cursor: "pointer",
});

export const mobileTitle = style({
  margin: 0,
  fontSize: 20,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.white,
});

export const item = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  width: "100%",
  padding: 20,
  background: "none",
  border: 0,
  borderBottom: `1px solid ${vars.color.gray400}`,
  font: "inherit",
  color: vars.color.gray300,
  fontWeight: vars.fontWeight.light,
  textAlign: "left",
  cursor: "pointer",
});

// 안 읽은 알림: 옅은 흰 배경 + 흰 글자
export const unread = style({
  background: "rgba(255, 255, 255, 0.05)",
  color: vars.color.white,
  fontWeight: vars.fontWeight.regular,
});

export const message = style({ fontSize: 14, lineHeight: 1.4 });

export const time = style({
  fontSize: 12,
  color: vars.color.gray300,
  fontWeight: vars.fontWeight.light,
});

export const empty = style({
  padding: "40px 20px",
  fontSize: 14,
  color: vars.color.gray300,
  textAlign: "center",
});
