import React from 'react';
import styled from 'styled-components';
function Header() {
  return (
    <HeaderCompo>
      <Ph> Republic of the Philippines</Ph>
      <Bsu> Batangas State University</Bsu>
      <Univ>The National Engineering University</Univ>
      <Add> Alangilan Campus</Add>
    </HeaderCompo>
  );
}

export default Header;
const HeaderCompo = styled.div`
  padding: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid;
  line-height: 17px;
`;
const Ph = styled.p`
  font-size: 12px;
`;
const Bsu = styled.h2`
  letter-spacing: 3px;
`;
const Univ = styled.p`
  font-size: 10px; ;
`;
const Add = styled.p`
  font-size: 10px;
  font-weight: bold;
`;
