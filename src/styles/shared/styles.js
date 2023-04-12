// Share common styled between pages
import styled from 'styled-components';

// Tenants and Users Header
export const StyledHeader = styled.header`
  width: 100%;
  background-color: white;

  position: sticky;
  top: 0;

  & > div:first-child {
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;
    gap: rem;

    /* Title */
    h1 {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 700px;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  gap: 0.25rem;
  align-items: center;

  input,
  select {
    height: 2rem;
    padding: 0.25rem;
  }

  input[type='search'] {
    padding-left: 1.75rem;
  }

  svg {
    position: absolute;
    color: gray;
    left: 0.5rem;
  }

  &:nth-child(2) {
    width: 375px;
  }

  &:last-child {
    width: 100%;

    input {
      width: 100%;
    }
  }
`;

/* ---------- END ----------*/
