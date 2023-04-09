import React from 'react';

import { Container } from './styled';

// components
import Left from './components/Left';
import Right from './components/Right';

import useToggle from '../../../hooks/useToggle';

function Settings() {
  const [modalIsOpen, toggleModalIsOpen] = useToggle(false);

  return (
    <Container>
      <Left />

      <Right />
    </Container>
  );
}

export default Settings;
