import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.5fr 1fr;

  gap: 1rem;

  /* Dormitory */
  div:nth-child(1) {
    grid-row: 1 / 3;
  }

  /* Canteen */
  div:nth-child(2) {
  }

  /* Summary */
  div:nth-child(3) {
  }
`;

export const Card = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.gray};
  border-radius: 20px;

  &:nth-child(1),
  &:nth-child(2) {
    overflow-y: hidden;
  }
`;

export const Title = styled.h1`
  font-weight: bold;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const Details = styled(Header)`
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

// Summary
export const SummaryContainer = styled.div`
  div {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
`;
