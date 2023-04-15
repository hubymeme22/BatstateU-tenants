import React from 'react';
import styled from 'styled-components';
import { ComponentContainer } from './Styled';
import useToggle from '../../../../hooks/useToggle';
import { Button } from './Styled';
function Modal({ handleClick }) {
  return (
    <Con>
      <Title> TERMS AND CONDITIONS</Title>
      <Content>
        Welcome to Pied Piper. These terms and conditions outline the rules and
        regulations for the use of Pied Piper's website and services. By
        accessing this website, we assume you accept these terms and conditions
        in full. Do not continue to use Pied Piper's website if you do not
        accept all of the terms and conditions stated on this page.
      </Content>
      <Buttons onClick={handleClick}>Back</Buttons>
    </Con>
  );
}

export default Modal;
const Con = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  height: 80%;
  width: 95%;

  border: 1px solid;
  color: black;
  border-radius: 10px;
  background-color: white;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;
const Content = styled.div`
  @media screen and (max-width: 767px) {
    font-size: 12px;
    width: 90%;
  }
  padding: 2px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Buttons = styled(Button)`
  font-size: 12px;
  width: 40%;
`;
const Title = styled.div`
  color: #c52d2d;
  font-weight: bold;
`;
