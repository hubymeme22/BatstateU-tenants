import React from 'react';
import styled from 'styled-components';
import { prepare, reviewer, verifier } from '../../../services/request';
import { getRGONames } from '../../../services/request';
function FormSig() {
  const [rgo, setRgoNames] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      const fetchedData = await getRGONames();
      setRgoNames(fetchedData.data.names);
    };
    getData();
  }, []);

  return (
    <Table>
      <Blocks>
        <Name>Prepared by:</Name>
        <Divider bottom='bottom'>
          <Pirma>
            <img alt='picture' src={prepare} />
          </Pirma>
          <Label>{rgo.prepared}</Label>
          <NameSig>RGO Staff</NameSig>
        </Divider>
        <Name>Reviewed by: </Name>
        <Divider>
          <Pirma>
            <img alt='picture' src={reviewer} />
          </Pirma>
          <Label>{rgo.reviewed}</Label>

          <NameSig>Head,Resource Generation</NameSig>
        </Divider>
      </Blocks>
      <Blocks>
        <Name>Checked and verified by: </Name>
        <Divider bottom='bottom'>
          <Pirma>
            <img alt='picture' src={verifier} />
          </Pirma>
          <Label>{rgo.verified}</Label>
          <NameSig>Senior Bookkeeper</NameSig>
        </Divider>
        <Name>Received by:</Name>
        <Divider>
          <Label>{rgo.recieved}</Label>
          <Line />
          <NameSig>Signature Over Printed Name</NameSig>
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
  position: relative;
  flex: 1;
  border-bottom: ${(props) =>
    props.bottom === 'bottom' ? '1px solid' : 'none'};
  display: flex;
  justify-content: center;
  align-items: center;

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
const Pirma = styled.div`
  position: absolute;
  width: 70%;
  top: -30px; ;
`;
const Line = styled.hr`
  border-top: 1px solid black;
  width: 300px;
`;
