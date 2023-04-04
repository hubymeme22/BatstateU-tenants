import styled from 'styled-components';

export const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.darkGray};
  padding: 1em;
  height: 100vh;
  display: flex;
  gap: 1em;
  overflow: hidden;

  @media screen and (max-width: 1200px) {
    width: 1300px;
  }
`;

export const Content = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
`;
