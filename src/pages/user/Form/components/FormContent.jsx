import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import { Container } from '../Styled';
import DearUser from './DearUser';
function FormContent() {
  return (
    <Container>
      <Header />
      <DearUser />
    </Container>
  );
}

export default FormContent;
