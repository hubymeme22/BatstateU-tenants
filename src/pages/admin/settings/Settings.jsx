import React from 'react';

import { Container } from './styled';

// components
import Left from './components/Left';
import Right from './components/Right';

import useToggle from '../../../hooks/useToggle';

import { ToastContainer, toast } from 'react-toastify';

function Settings() {
  const [modalIsOpen, toggleModalIsOpen] = useToggle(false);

  const notify = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <Container>
        <Left notify={notify} />

        <Right />
      </Container>
    </>
  );
}

export default Settings;
