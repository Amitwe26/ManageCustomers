import { css } from 'styled-components';

interface ThemeFunctionProps {
  direction: boolean;
}

export const theme = {
  colors: {
    text: {
      gray: 'rgba(90,90,90,0.8)',
      base: '#ffffff',
    },
    backgroundColor: {
      base: 'rgba(249, 251, 253)',
      secondary: '#018bfc',
      light: '#c4cce8',
      deep: '#3d4a88',
      baseBlue: '#60a9ef',
      yellow: '#f7d358',
      softOrange: '#f8a755',
      softRed: '#f2a1a6',
      white: '#ffffff',
    },
    border: {
      gray: '#e0e0e0',
      lightGray: '#f7f7f7',
      darkGray: '#424242',
    },
    button: {
      primary: '#6a4fc8',
      gray: '#e3e3e3',
      softOrange: '#ffa363',
      light: '#d5c6f4',
      delete: '#f44e5e',
    },
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
  },
  utils: {
    flexDirectionRtl: (theme: ThemeFunctionProps) => css`
      direction: ${theme.direction ? 'rtl' : 'ltr'};
    `,
  },
};
