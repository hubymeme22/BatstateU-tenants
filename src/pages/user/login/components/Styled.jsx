import styled from 'styled-components';

import { FaUserCircle } from 'react-icons/fa';
import { BsKey } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { Link as LinkTag } from 'react-router-dom';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const ContentContainer = styled.div`
  @media screen and (max-width: 767px) {
    width: 85%;
  }

  border-radius: 25px;
  height: 550px;
  width: 800px;
  background-color: #651b1b;
  display: flex;
`;

export const Wrapper = styled.div`
  @media screen and (max-width: 767px) {
    transition: all 0.8s ease-in-out;
    width: 100%;
    z-index: 1;
    ${(props) =>
      props.switch !== true
        ? `
    transform: rotateY(360deg);
   
   
    opacity: 1;
  `
        : null}
  }

  width: 50%;
  height: 100%;
  background-color: #651b1b;
  border-radius: 25px;

  z-index: 1;
  ${(props) =>
    props.switch !== true
      ? `
    transform: translateX(100%);
  
    opacity: 1;
  `
      : null}
`;

export const ComponentContainer = styled.div`
  transition: all 0.6s ease-in-out;

  margin: 0;
  padding: 30px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

export const UserIcon = styled(FaUserCircle)``;

export const EmailIcon = styled(AiOutlineMail)``;

export const KeyIcon = styled(BsKey)`
  transform: rotate(90deg);
`;

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
