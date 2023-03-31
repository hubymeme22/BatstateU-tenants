import React from 'react';
import styled from 'styled-components';

import { Container } from '../Styled';
import ControlNum from './2ControlNum';
import Header from './1Header';
import Penalty from './4Penalty';
import TenantInfo from './3TenantInfo';
import SpaceRental from './5SpaceRental';
import Tit from './Tit';
import Utility from './6Utility';
import AmountDue from './7AmountDue';
import Note from './8Note';
import FormSig from './9FormSig';

function FormContent() {
  //map here

  return (
    <Container Id='userForm'>
      <Header />
      <ControlNum />
      <TenantInfo />
      <Penalty />
      <SpaceRental />
      <Tit />
      <Utility />
      <AmountDue />
      <Note />
      <FormSig />
    </Container>
  );
}

export default FormContent;
