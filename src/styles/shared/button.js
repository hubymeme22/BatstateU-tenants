import styled from 'styled-components';

export const Button = styled.button`
  align-self: end;
  background-color: ${({ primary }) => (primary ? '#00DF24' : '#9A9A9A')};
  border: 0;
  padding: 0.5rem;
  width: 125px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
