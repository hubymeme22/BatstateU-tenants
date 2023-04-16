import React from 'react';

import { Container } from './styled';

// components
import Signatures from './components/Signatures';
import Left from './components/Left';
import Right from './components/Right';

function Settings() {
  return (
    <>
      <Container>
        <Left />
        <Right />
        <Signatures />
      </Container>
    </>
  );
}

export default Settings;
