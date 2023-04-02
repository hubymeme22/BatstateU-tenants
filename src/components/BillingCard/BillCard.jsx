import React from 'react';

import { Bill, Title } from './styled';

// Components
import Header from './Header';
import BillContent from './BillContent';

function BillingCard({ tenants }) {
  return (
    <Bill>
      <Header />
      <Title>Billing Statement</Title>
      <BillContent tenants={tenants} />
    </Bill>
  );
}

export default BillingCard;
