import styled from 'styled-components';

export const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.darkGray};
  padding: 1em;
  min-height: 100vh;
  display: flex;
  gap: 1em;
`;

export const Content = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 2rem;

  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;
