import React from 'react';
import styled from 'styled-components';
function FormSig({ prepared, reviewed, verified, recieved }) {
  return (
    <Table>
      <Blocks>
        <Divider bottom='bottom'>
          <Name>Prepared by:</Name>
          <Label>{prepared}</Label>
          <NameSig>RGO Staff</NameSig>
        </Divider>
        <Divider>
          <Name>Reviewed by: </Name>
          <Label>{reviewed}</Label>
          <NameSig>Head,Resource Generation</NameSig>
        </Divider>
      </Blocks>
      <Blocks>
        <Divider bottom='bottom'>
          <Name>Checked and verified by: </Name>
          <Label>{verified}</Label>
          <NameSig>RGO Staff</NameSig>
        </Divider>
        <Divider>
          <Name>Received by:</Name>
          <Label>{recieved}</Label>
          <NameSig>RGO Staff</NameSig>
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

  & > div:nth-child(1) {
  }

  & > div:nth-child(2) {
    border-right: 0;
  }
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
`;
const Name = styled.div`
  padding: 2px;
  font-size: 15px;
`;
const NameSig = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
