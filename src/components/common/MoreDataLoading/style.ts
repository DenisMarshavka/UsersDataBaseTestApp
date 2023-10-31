import styled from 'styled-components/native';

export const Container = styled.View<{mT?: number}>`
  width: 100%;
  align-items: center;

  margin-top: ${({mT}) => mT}px;
`;
