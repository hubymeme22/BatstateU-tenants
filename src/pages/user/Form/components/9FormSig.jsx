import React from 'react';
import styled from 'styled-components';
function FormSig() {
  return (
    <Table>
      <Blocks>
        <Divider bottom='bottom'>
          <Name>Prepared by:</Name>
          <Name>Date:</Name>
        </Divider>
        <Divider>
          <Name>Reviewed by: </Name>
          <Name>Date:</Name>
        </Divider>
      </Blocks>
      <Blocks>
        <Divider bottom='bottom'>
          <Name>Checked and verify by: </Name>
          <Name>Date:</Name>
        </Divider>
        <Divider>
          <Name>Received by:</Name>
          <Name>Date:</Name>
        </Divider>
      </Blocks>
    </Table>
  );
}

export default FormSig;
const Table = styled.div`
  height: 200px;
  border: 1px solid;
  border-top: none;
  border-bottom: none;
  display: flex;
`;
const Blocks = styled.div`
  flex: 1;
  border-right: 1px solid;
  display: flex;
  flex-direction: column;
`;
const Divider = styled.div`
  flex: 1;
  border-bottom: ${(props) =>
    props.bottom === 'bottom' ? '1px solid' : 'none'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Name = styled.div`
  padding: 2px;
  font-size: 15px;
`;
