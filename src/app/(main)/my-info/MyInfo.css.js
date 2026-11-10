import { globalStyle, style } from "@vanilla-extract/css";
import { errorHidden } from "@/components/field/Field.css";
import * as textField from "@/components/textField/TextField.css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";

export const page = style({
  width: "min(560px, calc(100% - 40px))",
  margin: "72px auto 96px",
  color: vars.color.white,
  "@media": {
    [media.mobile]: { margin: "40px auto 64px" },
  },
});

export const title = style({ margin: 0, fontSize: 36 });
export const heading = style({ margin: 0, fontSize: 18 });
export const hint = style({
  marginTop: 10,
  fontSize: 14,
  color: vars.color.gray300,
});

export const section = style({
  marginTop: 40,
  paddingTop: 36,
  borderTop: "1px solid #2b2b2b",
  "@media": {
    [media.mobile]: { marginTop: 28, paddingTop: 24 },
  },
});

export const row = style({ display: "flex", alignItems: "center", gap: 8 });
export const accountField = style({});
export const emailField = style({});

globalStyle(`.${accountField} .${errorHidden}`, {
  display: "none",
});

globalStyle(`.${accountField} .${textField.input}`, {
  flex: 1,
  minWidth: 0,
  height: 56,
  padding: "0 20px",
});

globalStyle(`.${emailField} .${textField.inputWrapper}`, {
  position: "relative",
});

globalStyle(`.${emailField} .${textField.input}`, {
  paddingRight: 100,
  borderColor: vars.color.gray400,
  color: vars.color.gray300,
});

globalStyle(`.${emailField} .${textField.suffix}`, {
  position: "absolute",
  right: 16,
  marginLeft: 0,
});

export const badge = style({
  display: "block",
  padding: "3px 8px",
  border: "1px solid",
  color: vars.color.main,
  fontSize: 12,
});

export const button = style({
  minHeight: 56,
  padding: "0 24px",
  border: `1px solid ${vars.color.main}`,
  background: vars.color.main,
  color: vars.color.black,
  font: "inherit",
  fontWeight: 700,
  whiteSpace: "nowrap",
  cursor: "pointer",
  selectors: {
    "&:disabled": { opacity: 0.55, cursor: "not-allowed" },
  },
});

export const passwordForm = style({ display: "grid", gap: 20, marginTop: 20 });

export const dangerHeading = style([heading, { color: vars.color.red }]);
export const dangerPanel = style([
  row,
  {
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 12,
    padding: "20px 24px",
    border: `1px solid ${vars.color.red}`,
  },
]);
export const dangerButton = style([
  button,
  {
    minHeight: 44,
    borderColor: vars.color.red,
    background: "transparent",
    color: vars.color.red,
  },
]);
