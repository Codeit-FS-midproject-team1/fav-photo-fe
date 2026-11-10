import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

// 시안 PC: 헤더 아래 60, 제목 아래 20, 카드 위 60
export const page = style({ padding: "60px 0 120px" });

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 20,
});

export const searchAndFilters = style({
  display: "flex",
  alignItems: "center",
  gap: 60,
});

export const list = style({ marginTop: 60 });

export const message = style({
  display: "block",
  padding: "80px 0",
  color: vars.color.gray300,
  textAlign: "center",
});
