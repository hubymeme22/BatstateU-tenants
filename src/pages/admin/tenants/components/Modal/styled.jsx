import ReactModal from 'react-modal';
import styled from 'styled-components';

export const StyledModalStatement = styled(ReactModal)`
  padding: 2rem;
  padding-bottom: 1.5rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  outline: 0;
  gap: 1rem;
  height: 821px;

  @media screen and (max-height: 800px) {
    height: 90vh;
  }
`;

export const Button = styled.button`
  padding: 0.5rem 2rem;

  background-color: #66e95f;
  align-self: end;

  border: 0;
  border-radius: 5px;
  cursor: pointer;

  font-weight: bold;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
