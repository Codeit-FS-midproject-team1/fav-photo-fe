import { style } from "@vanilla-extract/css";
import { vars, fontWeight } from "@/styles/theme.css";

export const header = style({
  background: vars.color.black,
});

export const inner = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "28px 220px",
});

export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: 30,
});

export const points = style({
  color: vars.color.gray200,
  fontWeight: fontWeight.bold,
});

export const iconButton = style({});

export const userButton = style({
  color: vars.color.gray200,
  fontFamily: "var(--font-br-b)",
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
