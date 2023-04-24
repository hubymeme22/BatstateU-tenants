import React from 'react';

import { Grid, Border, FChild, SChild, TChild, Divider } from '../Styled';

function Utility(props) {
  return (
    <Grid>
      <Border>
        <FChild>BALANCE FROM PREVIOUS BILLING</FChild>
        <SChild>Php: {props.prev.toFixed(2)}</SChild>
      </Border>
      <Border>
        <Divider>CURRENT ADD</Divider>{' '}
        <SChild>
          <Divider first="first">AMOUNT</Divider>
          <Divider>DUE DATE</Divider>
        </SChild>
        <SChild>
          <Divider first="first"> ₱ {props.amount.toFixed(2)}</Divider>
          <Divider>
            {' '}
            {props.month}/{props.day}/{props.year}
          </Divider>
        </SChild>
      </Border>
      <Border last="last">
        <TChild>AMOUNT DUE</TChild>
        <FChild top="top"> ₱ {props.total.toFixed(2)}</FChild>
      </Border>
    </Grid>
  );
}

export default Utility;
