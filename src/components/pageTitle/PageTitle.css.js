import { style } from "@vanilla-extract/css";
import { fontWeight, vars } from "@/styles/theme.css";

const MOBILE = "screen and (max-width: 767px)";

export const wrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  paddingBottom: 20,
  borderBottom: `1px solid ${vars.color.gray300}`,
  "@media": {
    [MOBILE]: {
      paddingBottom: 12,
    },
  },
});

export const title = style({
  fontSize: 62,
  fontWeight: fontWeight.regular,
  fontFamily: "var(--font-br-b)",
  color: vars.color.white,
  "@media": {
    [MOBILE]: {
      fontSize: 24,
    },
  },
});
