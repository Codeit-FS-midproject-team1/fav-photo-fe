export const breakpoints = {
  mobile: 767,
  tablet: 768,
  desktop: 1200,
};

export const media = {
  mobile: `screen and (max-width: ${breakpoints.mobile}px)`,
  tablet: `screen and (min-width: ${breakpoints.tablet}px)`,
  tabletOnly: `screen and (min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  desktop: `screen and (min-width: ${breakpoints.desktop}px)`,
};

export const responsiveWidths = {
  desktop: { width: 520, maxWidth: "100%" },
  tablet: { width: 440, maxWidth: "100%" },
  mobile: { width: 345, maxWidth: "100%" },
};
