import styled from 'styled-components/native';

import theme from '@/shared/theme';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.GRAY_800};
`;

export const Indicator = styled.ActivityIndicator.attrs(() => ({
  size: 'large',
  color: theme.COLORS.WHITE,
}))``;
