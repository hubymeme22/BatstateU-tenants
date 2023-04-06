import React from 'react';
import styled from 'styled-components';

import { Blocks, Table, Title } from '../Styled';

function ControlNum() {
  return (
    <Table>
      <Title bold="bold">STATEMENT OF ACCOUNT (SPACE RENTAL)</Title>
      <Blocks>
        <SChild></SChild>
        <Child> Control No:</Child>
      </Blocks>
    </Table>
  );
}

export default ControlNum;

const Child = styled.div`
  border-left: 1px solid;
  flex: 1;
  padding-left: 2px; ;
`;
const SChild = styled.div`
  flex: 2;
`;
