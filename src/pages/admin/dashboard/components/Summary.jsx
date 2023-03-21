import React from 'react';

import { Card, Title, SummaryContainer } from '../styled';

function Summary({ data }) {
  const { occupiedDorms, totalSlot } = data.summary;
  const { totalBorders, totalCanteenTenants } = data.summary;

  return (
    <Card>
      <Title>Summary</Title>
      <hr />
      <SummaryContainer>
        <div>
          <p>Occupied Dormitory Rooms:</p>
          {`${occupiedDorms} / ${totalSlot}`}
        </div>

        <div>
          <p>Student boarders:</p>
          {`${totalBorders} / ${totalBorders}`}
        </div>

        <div>
          <p>Tenants in Canteen:</p>
          {`${totalCanteenTenants} / ${totalCanteenTenants}`}{' '}
        </div>
      </SummaryContainer>
    </Card>
  );
}

export default Summary;
