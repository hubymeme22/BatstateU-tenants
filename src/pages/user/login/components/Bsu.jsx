import React from 'react';
import styled from 'styled-components';
import { ComponentContainer } from './Styled';
function Bsu({ toggle }) {
  return <BSUContainer switch={toggle}> Bsu</BSUContainer>;
}

export default Bsu;

const BSUContainer = styled.div`
  padding: 30px;
  z-index: 1;
  transition: all 0.6s ease-in-out;
  width: 50%;
  transform: ${(props) =>
    props.switch ? 'translateX(0)' : 'translateX(-100%)'};
`;
