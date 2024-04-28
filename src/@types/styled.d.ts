import 'styled-components';
import theme from '@/shared/theme';

declare module 'styled-components' {
  type Theme = typeof theme;
  export interface DefaultTheme extends Theme {
    COLORS: {
      WHITE: string;
      BRAND_LIGHT: string;
      BRAND_MID: string;
      GRAY_100: string;
      GRAY_200: string;
      GRAY_300: string;
      GRAY_400: string;
      GRAY_500: string;
      GRAY_800: string;
      GRAY_700: string;
      GRAY_600: string;
    };
    FONT_FAMILY: {
      REGULAR: string;
      BOLD: string;
    };
    FONT_SIZE: {
      XS: number;
      SM: number;
      MD: number;
      LG: number;
      XL: number;
      XXL: number;
      XXXL: number;
    };
  }
}
