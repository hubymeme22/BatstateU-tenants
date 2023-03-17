import styled from 'styled-components';
import { Link as LinkTag } from 'react-router-dom';

// Icons
import { FaUserCircle } from 'react-icons/fa';
import { BsKey } from 'react-icons/bs';

export const LoginContainer = styled.div`
  background-color: ${({ theme }) => theme.darkGray};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  background-color: ${({ theme }) => theme.primary};
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem;
  border-radius: 25px;
`;

export const Title = styled.h1`
  font-family: 'Staatliches';
  color: white;
  font-size: 2rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    position: relative;

    svg {
      font-size: 1.5rem;
      position: absolute;
      align-self: center;
      right: 0.5rem;
      color: gray;
    }
  }
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

export const Button = styled.button`
  background-color: ${({ theme }) => theme.lightRed};
  color: white;
  padding: 0.25rem;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
`;

export const Link = styled(LinkTag)`
  font-size: 0.9rem;
  color: white;
  text-decoration: underline;
`;

export const UserIcon = styled(FaUserCircle)``;

export const KeyIcon = styled(BsKey)`
  transform: rotate(90deg);
`;

export const Error = styled.p`
  color: white;
  text-align: center;
  font-size: 0.95rem;
`;
