import React from 'react';

import { Container } from './styled';

// components
import Signatures from './components/Signatures';
import Left from './components/Left';
import Right from './components/Right';
import BillingHeader from './components/BillingHeader';

function Settings() {
  return (
    <>
      <Container>
        <Left />
        <Right />
        <Signatures />
        <BillingHeader/>
      </Container>
    </>
  );
}

export default Settings;
