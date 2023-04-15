import React from 'react';
import styled from 'styled-components';

import BSULogo from '@/assets/logo.webp';

function Bsu({ toggle }) {
  return (
    <BSUContainer switch={toggle}>
      <img src={BSULogo} />
    </BSUContainer>
  );
}

export default Bsu;

const BSUContainer = styled.div`
  @media screen and (max-width: 767px) {
    transition: all 0.6s ease-in-out;
    display: none;
  }
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  z-index: 5;
  transition: all 0.6s ease-in-out;
  width: 50%;
  background-color: white;
  position: relative;
  transform: ${(props) =>
    props.switch ? 'translateX(0)' : 'translateX(-100%)'};
`;
