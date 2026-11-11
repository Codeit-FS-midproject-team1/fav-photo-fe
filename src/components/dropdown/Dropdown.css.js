import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const root = styleVariants({
  box: { position: "relative" },
  sort: { position: "relative", width: 180 },
  filter: { position: "relative", width: "fit-content" },
});

const boxTrigger = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "0 20px",
  background: vars.color.black,
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: 2,
  color: vars.color.white,
  font: "inherit",
  fontSize: 16,
  cursor: "pointer",
};

export const trigger = styleVariants({
  box: { ...boxTrigger, height: 60 },
  sort: { ...boxTrigger, height: 50 },
  filter: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 0,
    background: "none",
    border: 0,
    color: vars.color.gray200,
    font: "inherit",
    fontSize: 16,
    fontWeight: vars.fontWeight.bold,
    whiteSpace: "nowrap",
    cursor: "pointer",
  },
});

export const triggerError = style({ borderColor: vars.color.red });

export const placeholder = style({
  color: vars.color.gray200,
  fontWeight: vars.fontWeight.light,
});

const menuBase = {
  position: "absolute",
  left: 0,
  zIndex: 10,
  display: "flex",
  flexDirection: "column",
  margin: 0,
  listStyle: "none",
  background: vars.color.black,
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: 2,
};

export const menu = styleVariants({
  box: {
    ...menuBase,
    top: "calc(100% + 5px)",
    width: "100%",
    padding: 20,
    gap: 20,
  },
  sort: {
    ...menuBase,
    top: "calc(100% + 5px)",
    width: "100%",
    padding: "15px 20px",
    gap: 15,
  },
  filter: {
    ...menuBase,
    top: "calc(100% + 18px)",
    padding: "15px 20px",
    gap: 15,
  },
});

export const option = style({
  padding: 0,
  background: "none",
  border: 0,
  color: vars.color.white,
  font: "inherit",
  fontSize: 16,
  textAlign: "left",
  whiteSpace: "nowrap",
  cursor: "pointer",
});
