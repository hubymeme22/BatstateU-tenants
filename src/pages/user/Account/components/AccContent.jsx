import React from 'react';
import { Container } from '../Styled';
import Buttons from './Buttons';
import Head from './Head';
import MainContent from './MainContent';

function AccContent() {
  return (
    <Container>
      <Head />
      <MainContent />
      <Buttons />
    </Container>
  );
}

export default AccContent;
