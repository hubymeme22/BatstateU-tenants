import styled from 'styled-components';

import { Button as Btn } from '../../../styles/shared/button';
import { theme } from '../../../styles/theme';

export const Title = styled.h1`
  margin: 0 auto;

  text-align: center;

  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const Container = styled.form`
  margin: 0 auto;
  width: min(100%, 1000px);
  background-color: ${theme.gray};
  min-height: 50%;
  padding: 2rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  input,
  textarea {
    border-radius: 5px;
    border: 0;
    padding: 0.5rem;
  }
`;

export const Subject = styled.input`
  width: 40%;
`;

export const Message = styled.textarea`
  height: 300px;
  resize: none;
`;

export const Button = styled(Btn)`
  background-color: ${theme.green};
`;
