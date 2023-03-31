import React from 'react';
import { Blocks, Table, Title } from '../Styled';
import styled from 'styled-components';
function Penalty() {
  return (
    <Table>
      <Blocks>
        Penalty rate per month: 5% based on outstanding balance per month
      </Blocks>
      <Blocks>ACCOUNT SUMMARY:</Blocks>
      <Title>SPACE RENTAL</Title>
    </Table>
  );
}

export default Penalty;
