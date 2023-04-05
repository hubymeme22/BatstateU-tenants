import React from 'react';
import { Blocks, Table } from '../Styled';
import styled from 'styled-components';
function TenantInfo(props) {
  return (
    <Table>
      <Blocks>
        NAME OF TENANT: {props.first} {props.last}
      </Blocks>
      <Blocks>
        <Child title='title'>STALL LOCATION: {props.loc} </Child>

        <Child>BILLING PERIOD: </Child>
      </Blocks>
      <Blocks>MONTHLY RENTAL: {props.rent}</Blocks>
    </Table>
  );
}

export default TenantInfo;

const Child = styled.div`
  display: flex;
  padding-left: ${(props) => (props.title === 'title' ? 'none' : '2px')};

  border-right: ${(props) => (props.title === 'title' ? '1px solid' : 'none')};
  flex: ${(props) => (props.title === 'title' ? 2 : 1)};
`;
