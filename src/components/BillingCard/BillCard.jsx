import React from 'react';

import { Bill, Button, ButtonContainer, Container, Title } from './styled';

// Components
import Header from './Header';
import BillContent from './BillContent';

function BillingCard({ tenants }) {
  return (
    <Container>
      <Bill>
        <Header />
        <Title>Billing Statement</Title>
        <BillContent tenants={tenants} />
      </Bill>
      <ButtonContainer>
        <Button color="#777"> Clear</Button>
        <Button color="#66E95F"> Save</Button>
      </ButtonContainer>
    </Container>
  );
}

export default BillingCard;
