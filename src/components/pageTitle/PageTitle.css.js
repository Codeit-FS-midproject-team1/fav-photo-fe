import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";


export const wrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  paddingBottom: 20,
  borderBottom: `1px solid ${vars.color.gray300}`,
  "@media": {
    [media.mobile]: {
      paddingBottom: 12,
    },
  },
});

export const title = style({
  fontSize: 62,
  fontWeight: vars.fontWeight.regular,
  fontFamily: vars.font.br,
  color: vars.color.white,
  "@media": {
    [media.mobile]: {
      fontSize: 24,
    },
  },
});
