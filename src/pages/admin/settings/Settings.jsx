import React from 'react';

import { Container } from './styled';

// components
import Left from './components/Left';
import Right from './components/Right';

function Settings() {
  return (
    <>
      <Container>
        <Left />

        <Right />
      </Container>
    </>
  );
}

export default Settings;
