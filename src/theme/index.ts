interface IColors {
  WHITE: string;
}

interface IFontFamily {
  REGULAR: string;
  BOLD: string;
}

interface IFontSize {
  XS: number;
  SM: number;
  MD: number;
  LG: number;
  XL: number;
  XXL: number;
  XXXL: number;
}

export interface ITheme {
  COLORS: IColors;
  FONT_FAMILY: IFontFamily;
  FONT_SIZE: IFontSize;
}

export default {
  COLORS: {
    WHITE: "#FFFFFF",

    BRAND_LIGHT: "#00B37E",
    BRAND_MID: "#00875F",

    GRAY_100: "#E1E1E6",
    GRAY_200: "#C4C4CC",
    GRAY_300: "#8D8D99",
    GRAY_400: "#7C7C8A",
    GRAY_500: "#505059",
    GRAY_800: "#202024",
    GRAY_700: "#29292E",
    GRAY_600: "#323238",
  },

  FONT_FAMILY: {
    REGULAR: "Roboto_400Regular",
    BOLD: "Roboto_700Bold",
  },

  FONT_SIZE: {
    XS: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 20,
    XXL: 24,
    XXXL: 32,
  },
};
