import React, { useState } from 'react';

import { Bill, Title } from './styled';

// Components
import Header from './Header';
import BillContent from './BillContent';

function BillingCard() {
  const [tenants, setTenants] = useState([]);

  return (
    <Bill>
      <Header />
      <Title>Billing Statement</Title>
      <BillContent />
    </Bill>
  );
}

export default BillingCard;
