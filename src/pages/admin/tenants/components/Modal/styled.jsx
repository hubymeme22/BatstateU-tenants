import ReactModal from 'react-modal';
import styled from 'styled-components';

import { Button as Btn } from '../../../../../styles/shared/button';

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
    overflow-y: scroll;
  }
`;

export const Button = styled(Btn)`
  background-color: #66e95f;
  width: auto;
`;
