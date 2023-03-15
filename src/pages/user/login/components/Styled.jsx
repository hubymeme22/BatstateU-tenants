import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { BsKey } from 'react-icons/bs';
import { Link as LinkTag } from 'react-router-dom';
export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('src/pages/user/login/assets/BSUBG.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
export const ContentContainer = styled.div`
  border-radius: 25px;
  height: 550px;
  width: 800px;
  background-color: white;
  display: flex;
`;
export const Wrapper = styled.div`
  transition: all 0.6s ease-in-out;
  border-radius: 25px;
  width: 50%;
  height: 100%;
  background-color: #651b1b;
  z-index: 5;
  ${(props) =>
    props.switch !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
  `
      : null}
`;

export const ComponentContainer = styled.div`
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

export const UserIcon = styled(FaUserCircle)``;

export const KeyIcon = styled(BsKey)`
  transform: rotate(90deg);
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.lightRed};
  color: white;
  padding: 0.3rem;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
`;
export const SignInButton = styled.button`
  background-color: white;
  color: red;
  padding: 0.3rem;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
`;
export const Link = styled(LinkTag)`
  font-size: 0.9rem;
  color: white;
  text-decoration: underline;
`;
export const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5px;
  gap: 20px;
`;
