import styled from 'styled-components/native';
import theme from '../../../theme';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${theme.COLORS.GRAY_800}; //pegando direto do arquivo pois aqui as fonts podem não ter sido carregadas ainda
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs(() => ({
  size: 'large',
  color: theme.COLORS.BRAND_LIGHT,
}))``;