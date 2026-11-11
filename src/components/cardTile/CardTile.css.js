import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";

// 시안: PC 패딩 40 · 태블릿 20 · 모바일 10 (모바일은 글자도 작고 로고가 없다)

export const card = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minWidth: 0,
  padding: 40,
  background: vars.color.gray500,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 2,
  color: vars.color.white,
  font: "inherit",
  textAlign: "left",
  selectors: { "button&": { cursor: "pointer" } },
  "@media": {
    [media.tabletOnly]: { padding: 20 },
    [media.mobile]: { padding: 10 },
  },
});

export const imageBox = style({
  position: "relative",
  aspectRatio: "4/3",
  overflow: "hidden",
});

export const image = style({
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const dimmed = style({ opacity: 0.3 });

export const soldOut = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "60%",
  height: "auto",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
});

export const badge = style({ position: "absolute", top: 10, left: 10 });

export const info = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginTop: 25,
  "@media": {
    [media.mobile]: { gap: 5, marginTop: 10 },
  },
});

export const name = style({
  fontSize: 22,
  fontWeight: vars.fontWeight.bold,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "@media": {
    [media.mobile]: { fontSize: 14 },
  },
});

export const meta = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: 16,
  fontWeight: vars.fontWeight.light,
  "@media": {
    [media.mobile]: { fontSize: 10 },
  },
});
export const tags = style({
  display: "flex",
  gap: 10,
  "@media": {
    [media.mobile]: { gap: 5 },
  },
});

export const bar = style({
  color: vars.color.gray400,
  fontWeight: vars.fontWeight.regular,
});

export const genre = style({
  color: vars.color.gray300,
  fontWeight: vars.fontWeight.regular,
});

export const nickname = style({
  fontWeight: vars.fontWeight.regular,
  textDecoration: "underline",
});

export const divider = style({
  margin: "20px 0",
  border: 0,
  borderTop: `1px solid ${vars.color.gray400}`,
  "@media": {
    [media.mobile]: { margin: "10px 0" },
  },
});

export const rows = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  margin: 0,
  "@media": {
    [media.mobile]: { gap: 5 },
  },
});

export const row = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const label = style({
  fontSize: 16,
  fontWeight: vars.fontWeight.light,
  color: vars.color.gray300,
  "@media": {
    [media.mobile]: { fontSize: 10 },
  },
});

export const value = style({
  margin: 0,
  fontSize: 18,
  "@media": {
    [media.mobile]: { fontSize: 10 },
  },
});

export const total = style({
  marginLeft: 5,
  fontWeight: vars.fontWeight.light,
  color: vars.color.gray300,
  "@media": {
    [media.mobile]: { marginLeft: 2 },
  },
});

export const logo = style({
  alignSelf: "center",
  marginTop: 40,
  "@media": {
    [media.tabletOnly]: { marginTop: 30 },
    [media.mobile]: { display: "none" },
  },
});
