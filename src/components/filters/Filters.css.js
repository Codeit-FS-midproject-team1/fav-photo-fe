import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";

export const filters = style({
  display: "flex",
  alignItems: "center",
  gap: 45,
});

export const hideOnMobile = style({
  "@media": {
    [media.mobile]: { display: "none" },
  },
});

// 모바일 필터 아이콘 버튼
export const sheetToggle = style({
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

/* ---------- 바텀시트 (팀 Modal 안) ---------- */

export const sheetTitle = style({
  position: "absolute",
  top: 16,
  left: 0,
  right: 0,
  margin: 0,
  fontSize: 16,
  color: vars.color.gray400,
  textAlign: "center",
});

export const tabs = style({
  display: "flex",
  gap: 24,
  margin: "0 -24px",
  padding: "0 24px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
});

export const tab = style({
  padding: 16,
  background: "none",
  border: 0,
  borderBottom: "1.5px solid transparent",
  color: vars.color.gray400,
  font: "inherit",
  fontSize: 14,
  cursor: "pointer",
});

export const tabActive = style({
  borderBottomColor: vars.color.white,
  color: vars.color.white,
});

export const options = style({
  margin: "0 -24px",
  padding: 0,
  listStyle: "none",
});

export const option = style({
  width: "100%",
  padding: "16px 32px",
  background: "none",
  border: 0,
  color: vars.color.gray300,
  font: "inherit",
  fontSize: 14,
  textAlign: "left",
  cursor: "pointer",
});

export const optionSelected = style({
  background: vars.color.black,
  color: vars.color.white,
});

export const sheetFooter = style({
  display: "flex",
  alignItems: "center",
  gap: 15,
  marginTop: 40,
});

export const reset = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 55,
  height: 55,
  padding: 0,
  background: "none",
  border: 0,
  cursor: "pointer",
});

export const apply = style({
  flex: 1,
  height: 55,
  background: vars.color.main,
  border: 0,
  borderRadius: 2,
  color: vars.color.black,
  font: "inherit",
  fontSize: 16,
  fontWeight: vars.fontWeight.bold,
  cursor: "pointer",
});
