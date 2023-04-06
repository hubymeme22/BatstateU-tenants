import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

function MainForm(props) {
  return <Container>{props.content}</Container>;
}

export default MainForm;
const Container = styled.div`
  padding: 20px;
  @media screen and (max-width: 768px) {
    height: 350px;
  }
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  line-height: 1.5rem;
  letter-spacing: 1px;
`;
