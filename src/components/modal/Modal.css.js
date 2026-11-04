import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const MOBILE = 'screen and (max-width: 767px)';

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.97)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

const slideUp = keyframes({
  from: { transform: 'translateY(100%)' },
  to: { transform: 'translateY(0)' },
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0, 0, 0, 0.6)',
});

export const panel = style({
  position: 'relative',
  width: '100%',
  overflowY: 'auto',
  padding: '80px 110px 60px',
  background: vars.color.gray500,
  borderRadius: 2,
  outline: 'none',
  boxSizing: 'border-box',
  animation: `${fadeIn} 0.15s ease-out`,
  '@media': {
    [MOBILE]: {
      padding: '56px 24px 40px', 
      animation: `${slideUp} 0.2s ease-out`,
    },
  },
});

const sizeVariant = (w) => ({
  maxWidth: w,
  '@media': { [MOBILE]: { maxWidth: '100%' } },
});

export const size = styleVariants({
  sm: sizeVariant(345),
  md: sizeVariant(400),
  lg: sizeVariant(560),
});

export const mobileType = styleVariants({
  sheet: {
    '@media': {
      [MOBILE]: {
        alignSelf: 'flex-end',
        maxHeight: '85vh',
        borderRadius: '16px 16px 0 0',
      },
    },
  },
  full: {
    '@media': {
      [MOBILE]: {
        height: '100%',
        maxHeight: '100%',
        borderRadius: 0,
      },
    },
  },
});

export const closeButton = style({
  position: 'absolute',
  top: 12,
  right: 12,
  width: 32,
  height: 32,
  border: 'none',
  background: 'transparent',
  fontSize: 24,
  lineHeight: 1,
  cursor: 'pointer',
  color: vars.color.gray300,
});