import { style } from '@vanilla-extract/css';
import { media } from '@/styles/responsive.css';

export const container = style({
  width: '100%',
  maxWidth: 1480,
  margin: '0 auto',
  '@media': {
    'screen and (max-width: 1527px)': {
      padding: '0 24px',
    },
    [media.mobile]: {
      padding: '0 16px',
    },
  },  
});