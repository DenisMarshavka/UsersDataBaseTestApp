import styled from 'styled-components/native';

export const Container = styled.View<{withMT?: boolean}>`
  position: relative;
  width: 100%;
  margin-top: ${({theme, withMT}) =>
    withMT ? `${theme.offsets.margin_xl}px` : 0};
`;
