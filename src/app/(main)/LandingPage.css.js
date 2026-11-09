import { vars } from "@/styles/theme.css";
import { media } from "@/styles/responsive.css";
import { style } from "@vanilla-extract/css";

export const hero = style({
  position: "relative",
});

export const featureSection = style({
  width: "100%",
});

export const heroBackground = style({
  position: "relative",
  margin: "33px 16px 12px",
  "@media": {
    [media.tablet]: {
      marginLeft: 32,
      marginRight: 32,
    },
  },
  borderRadius: 40,
  backgroundColor: "#434246",
  backgroundImage: [
    "radial-gradient(circle at 100% 0%, #684060 0%, rgba(104,64,96,0) 75%)",
    "radial-gradient(circle at 0% 100%, #40525e 0%, rgba(64,82,94,0) 75%)",
  ].join(", "),
  paddingTop: 50,
});

export const heroContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 24,
  padding: "0 16px",
  color: vars.color.white,
});

export const heroLogo = style({
  display: "none",
  "@media": {
    [media.tablet]: {
      display: "block",
    },
  },
});

export const heroImage = style({
  display: "block",
  width: "100%",
  height: "auto",
});

export const heroTitle = style({
  margin: 0,
  fontSize: 20,
  lineHeight: 1.2,
  textAlign: "center",
  "@media": {
    [media.tablet]: {
      fontSize: 40,
    },
  },
});

export const heroButton = style({
  fontSize: 12,

  "@media": {
    [media.tablet]: {
      selectors: {
        "&&": {
          width: 226,
          height: 55,
          fontSize: 16,
        },
      },
    },
  },
});

export const heroPicture = style({
  display: "block",
  position: "relative",
  zIndex: 1,
  margin: "8px -16px 0",
  "@media": {
    [media.tablet]: {
      marginLeft: -32,
      marginRight: -32,
    },
  },
});

export const featurePicture = style({
  display: "block",
  width: "100%",
});

export const highlight = style({
  color: vars.color.main,
});
