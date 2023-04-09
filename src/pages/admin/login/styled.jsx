import styled from 'styled-components';
import ceafaBG from '../../../assets/ceafa_bg.webp';

export const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.darkGray};
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${ceafaBG});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 10%;
`;

export const Form = styled.form`
  background-color: ${({ theme }) => theme.primary};
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
`;

export const Title = styled.h1`
  font-family: 'Staatliches';
  color: white;
  font-size: 2rem;
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

export const ViewButton = styled.button``;

export const Error = styled.p`
  color: white;
  text-align: center;
  font-size: 0.95rem;
`;
