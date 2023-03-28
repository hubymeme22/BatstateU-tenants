import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  /* Title */
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  div {
    display: flex;
    gap: 1rem;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    padding: 0.25rem;
  }

  svg {
    position: absolute;
    right: 0.5rem;
  }
`;

export const ColumnTitles = styled.div`
  font-weight: bold;
  display: grid;
  grid-template-columns: 150px repeat(5, 1fr);
  /* justify-items: center; */

  & > p:nth-child(4),
  & > p:nth-child(5),
  & > p:nth-child(6) {
    justify-self: center;
  }
`;

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserDetails = styled(ColumnTitles)`
  font-weight: normal;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: #b5d7ff;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
