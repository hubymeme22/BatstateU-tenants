import React from 'react';
import { Grid, Border, FChild, SChild, TChild, Divider } from '../Styled';
function Utility() {
  return (
    <Grid>
      <Border>
        <FChild>BALANCE FROM PREVIOUS BILLING</FChild>
        <SChild>Php: </SChild>
      </Border>
      <Border>
        <Divider>CURRENT ADD</Divider>{' '}
        <SChild>
          <Divider first='first'>AMOUNT</Divider>
          <Divider>DUE DATE</Divider>
        </SChild>
        <SChild>
          <Divider first='first'></Divider>
          <Divider></Divider>
        </SChild>
      </Border>
      <Border last='last'>
        <TChild>AMOUNT DUE</TChild>
        <FChild top='top'></FChild>
      </Border>
    </Grid>
  );
}

export default Utility;
