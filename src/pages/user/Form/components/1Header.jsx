import React from 'react';
import styled from 'styled-components';
import BSU from '../assets/BSU.svg';
function Header(props) {
  return (
    <Table>
      <SmallBlocks logo='logo'>
        <BSULOGO src={BSU}></BSULOGO>
      </SmallBlocks>
      <Blocks>Reference Number: </Blocks>
      <Blocks>Effectivity Data:</Blocks>
      <SmallBlocks left='left'>Revision: </SmallBlocks>
    </Table>
  );
}

export default Header;

const Table = styled.div`
  width: 100%;
  font-size: 15px;

  display: flex;
  justify-content: center; ;
`;
const Blocks = styled.div`
  border: 1px solid;
  width: 100%;
  height: 60px;
  flex: 2;
  padding: 3px;
  border-left: none;
`;
const SmallBlocks = styled.div`
  border: 1px solid;
  border-left: ${(props) => (props.left === 'left' ? 'none' : '1px solid')};
  width: 100%;

  height: 60px;
  flex: 0.5;
  padding: 3px;
  display: flex;
  justify-content: ${(props) =>
    props.logo === 'logo' ? 'center' : 'flex-start'};
`;
const BSULOGO = styled.img`
  height: 55px;
  width: 90px;
`;
