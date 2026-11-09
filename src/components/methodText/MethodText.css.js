import { styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const method = styleVariants({
  PHOTO: { color: vars.color.main },
  CRAFT: { color: vars.color.blue },
  AI: { color: vars.color.purple },
  ETC: { color: vars.color.pink },
});
