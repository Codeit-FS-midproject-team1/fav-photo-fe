import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css.js";

// 실제 테마 토큰을 사용하고, 정의되지 않은 배경/경계 색상만 기존 색상으로 유지합니다.
const colors = {
  background: vars.color.black,
  surface: "#1e1e1e",
  surfaceSubtle: "#303030",
  text: vars.color.white,
  textSecondary: vars.color.gray300,
  textMuted: vars.color.gray300,
  border: "#404040",
};

export const page = style({
  boxSizing: "border-box",
  width: "min(100%, 1120px)",
  margin: "0 auto",
  padding: "32px 20px 80px",
  backgroundColor: colors.background,
  color: colors.text,

  "@media": {
    "screen and (max-width: 720px)": {
      padding: "20px 16px 64px",
    },
  },
});

export const main = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
  gap: "40px",

  "@media": {
    "screen and (max-width: 720px)": {
      gridTemplateColumns: "1fr",
      gap: "24px",
    },
  },
});

export const imageFrame = style({
  display: "grid",
  minHeight: "360px",
  placeItems: "center",
  overflow: "hidden",
  borderRadius: "12px",
  backgroundColor: colors.surface,

  "@media": {
    "screen and (max-width: 720px)": {
      minHeight: "260px",
    },
  },
});

export const image = style({
  display: "block",
  width: "100%",
  height: "auto",
  maxHeight: "560px",
  objectFit: "contain",
});

export const imagePlaceholder = style({
  color: colors.textMuted,
});

export const information = style({
  minWidth: 0,
});

export const status = style({
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: "999px",
  backgroundColor: colors.surfaceSubtle,
  color: colors.text,
  fontSize: "13px",
});

export const name = style({
  margin: "16px 0 8px",
  color: colors.text,
  fontSize: "clamp(24px, 3vw, 36px)",
  lineHeight: 1.2,
  overflowWrap: "anywhere",
});

export const meta = style({
  margin: 0,
  color: colors.textMuted,
});

export const details = style({
  display: "grid",
  gap: "16px",
  padding: "24px 0",
  borderBottom: `1px solid ${colors.border}`,
});

export const detailsRow = style({
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
});

export const detailsTerm = style({
  color: colors.textMuted,
});

export const detailsValue = style({
  minWidth: 0,
  margin: 0,
  color: colors.text,
  fontWeight: 700,
  textAlign: "right",
  overflowWrap: "anywhere",
});

export const description = style({
  color: colors.textSecondary,
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
  lineHeight: 1.7,
});

export const actions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "28px",
});

const sectionBase = {
  minWidth: 0,
  marginTop: "36px",
  paddingTop: "24px",
  borderTop: `1px solid ${colors.border}`,
};

export const exchangeInfo = style(sectionBase);

export const extra = style(sectionBase);

export const sectionTitle = style({
  margin: "0 0 18px",
  color: colors.text,
  fontSize: "20px",
});

export const exchangeText = style({
  margin: "10px 0",
  color: colors.textSecondary,
  lineHeight: 1.6,
});

export const exchangeDescription = style({
  margin: "10px 0",
  color: colors.textSecondary,
  lineHeight: 1.6,
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
  minWidth: 0,
});
