import { css } from 'styled-components';

interface ThemeFunctionProps {
  direction: boolean;
}

export const theme = {
  colors: {
    text: {
      gray: 'rgba(64,64,64,0.71)',
    },
    backgroundColor: {
      base: 'rgba(249, 251, 253)',
      secondary: '#1e90ff',
      light: '#b39ddb',
      deep: '#512da8',
      baseBlue: 'rgba(96, 169, 239, 0.9)',
      yellow: '#ffeb3b',
      // softOrange: '#ffcc80',
      softOrange: '#fdc566',
      white: '#fff',
    },
    border: {
      gray: 'rgba(221, 221, 221, 0.4)',
      lightGray: '#f5f5f5',
      darkGray: '#424242',
    },
    button: {
      primary: '#7e57c2',
      light: '#b39ddb',
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
