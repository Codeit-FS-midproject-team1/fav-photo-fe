import { style } from '@vanilla-extract/css';

const MOBILE = 'screen and (max-width: 767px)';

export const container = style({
  width: '100%',
  maxWidth: 1480,
  margin: '0 auto',
  '@media': {
    'screen and (max-width: 1527px)': {
      padding: '0 24px',
    },
    [MOBILE]: {
      padding: '0 16px',
    },
  },
});