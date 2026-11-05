import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const MOBILE = "screen and (max-width: 767px)";

export const pagination = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
});

export const pageButton = style({
  width: 50,
  height: 50,
  border: "1px solid transparent",
  borderRadius: 2,
  backgroundColor: "transparent",
  color: vars.color.gray300,
  fontSize: 16,
  fontWeight: vars.fontWeight.regular,
  cursor: "pointer",

  "@media": { [MOBILE]: { width: 40, height: 40 } },
});

export const activePage = style({
  backgroundColor: vars.color.black,
  borderColor: vars.color.gray200,
  color: vars.color.white,
  fontWeight: vars.fontWeight.bold,
});

export const arrowButton = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 48,
  height: 48,
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  color: vars.color.white,

  "@media": { [MOBILE]: { width: 40, height: 40 } },
  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.3,
  },
});

const pageList = {
  alignItems: "center",
  gap: 10,
};

export const desktopList = style({
  ...pageList,
  display: "flex",
  "@media": { [MOBILE]: { display: "none" } },
});

export const mobileList = style({
  ...pageList,
  display: "none",
  "@media": { [MOBILE]: { display: "flex" } },
});

export const ellipsis = style({
  width: 50,
  textAlign: "center",
  color: vars.color.gray300,
  "@media": { [MOBILE]: { width: 40 } },
});
