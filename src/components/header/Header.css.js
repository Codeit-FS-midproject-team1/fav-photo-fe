import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css.js";

export const desktopHeader = style({
  background: vars.color.black,
  display: "block",

  "@media": {
    [media.mobile]: {
      display: "none",
    },
  },
});

export const header = style({
  width: "100%",
});

export const mobileHeaderWrap = style({
  display: "none",
  "@media": { [media.mobile]: { display: "block", position: "relative", zIndex: 10 } },
});

export const inner = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: 1640,
  margin: "0 auto",
  padding: "28px max(32px, calc((100vw - 1480px) / 2))",

  "@media": {
    [media.tabletOnly]: {
      padding: "24px 32px",
    },
    [media.mobile]: { padding: "20px 16px" },
  },
});

export const mobileHeader = style({
  display: "none",

  "@media": {
    [media.mobile]: {
      height: 56,
      padding: "0 20px",
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      background: vars.color.black,
    },
  },
});

export const menuButton = style({
  justifySelf: "start",
  display: "flex",
  alignItems: "center",
  padding: 0,
  color: vars.color.gray200,
  background: "transparent",
  border: 0,
  cursor: "pointer",
});

export const logo = style({
  justifySelf: "center",
  display: "flex",
  alignItems: "center",
});

export const login = style({
  justifySelf: "end",
  color: vars.color.gray200,
  fontSize: 14,
});

export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: 30,
  "@media": {
    [media.tabletOnly]: { gap: 16 },
  },
});

export const points = style({
  color: vars.color.gray200,
  fontWeight: vars.fontWeight.bold,
});


export const userButton = style({
  color: vars.color.gray200,
  fontFamily: vars.font.br,
});

export const divider = style({
  display: "block",
  background: vars.color.gray400,
  width: 1,
  height: 20,
});

export const logoutButton = style({
  color: vars.color.gray400,
  fontSize: 14,
});

export const loggedOutActions = style([
  actions,
  {
    color: vars.color.gray200,
    fontSize: 14,
  },
]);

export const mobileActions = style({
  justifySelf: "end",
  display: "flex",
  alignItems: "center",
  gap: 12,
});

export const mobileMenu = style({
  display: "flex",
  flexDirection: "column",
  padding: "8px 20px",
  background: vars.color.black,
  borderTop: `1px solid ${vars.color.gray400}`,
});

export const mobileUsername = style({
  color: vars.color.gray200,
  fontFamily: vars.font.br,
});

export const mobileMenuItem = style({
  position: "relative",
  display: "block",
  width: "100%",
  padding: "14px 0",
  color: vars.color.gray200,
  fontFamily: vars.font.br,
  textAlign: "left",
  border: 0,
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      left: -20,
      right: -20,
      bottom: 0,
      height: 1,
      background: vars.color.gray400,
    },
  },
});


