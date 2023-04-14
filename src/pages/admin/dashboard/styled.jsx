import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.5fr 1fr;

  gap: 1rem;

  & > div {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  }

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
  position: relative;
  padding: 1rem;
  padding-top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.gray};
  border-radius: 20px;

  &:nth-child(1),
  &:nth-child(2) {
    overflow-y: auto;
  }

  &:last-child {
    padding-top: 1rem;
  }

  & > div:first-child {
    position: sticky;
    padding-top: 1rem;
    top: 0;
    background-color: inherit;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 1px;
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

export const Contents = styled.div`
  overflow-y: auto;
`;
