import styled from 'styled-components';

import { AiOutlineMail } from 'react-icons/ai';
import { Link as LinkTag } from 'react-router-dom';

export const Title = styled.h1`
  font-family: 'Staatliches';
  color: white;
  font-size: 2rem;
  text-align: center;
  padding: 5px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;

  svg {
    font-size: 1.5rem;
    position: absolute;
    align-self: center;
    right: 0.5rem;
    color: gray;
  }

  div {
    display: flex;
    position: relative;

    button {
      position: absolute;
      align-self: center;
      height: 100%;
      right: 0;
      padding: 0 0.25rem;

      svg {
        position: static;
      }
    }
  }
`;

export const Checkbox = styled.div`
  display: flex;
  gap: 5px;
  font-size: 13px;
`;

export const Namess = styled.div`
  display: flex;
  gap: 5px;
`;

export const Label = styled.label`
  color: white;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  padding-right: 2rem;
  border-radius: 5px;
  border: 0;
`;

export const EmailIcon = styled(AiOutlineMail)``;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.lightRed};
  color: white;
  padding: 0.45rem;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
`;

export const SignInButton = styled.button`
  background-color: white;
  color: red;
  padding: 0.45rem;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
`;

export const Link = styled(LinkTag)`
  font-size: 0.9rem;
  color: white;
  text-decoration: ${(props) =>
    props.variant === 'underline' ? 'underline' : 'none'};
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5px;
  gap: 1.25rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  gap: 1rem;
  div {
    display: flex;
    flex-direction: column;
  }
`;

export const Message = styled.p`
  font-size: 12px;
  text-align: center;
  color: red;
  font-weight: bold;
`;
