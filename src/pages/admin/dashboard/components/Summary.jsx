import React from 'react';

import { Card, Title, SummaryContainer } from '../styled';

function Summary({ data }) {
  const { occupiedDorms, numberOfDorms } = data.summary;
  const { totalDormBorders, totalDormSlot, totalCanteenTenants, totalCanteenSlot } = data.summary;

  return (
    <Card>
      <Title>Summary</Title>
      <hr />
      <SummaryContainer>
        <div>
          <p>Occupied Dormitory Rooms:</p>
          {`${occupiedDorms} / ${numberOfDorms}`}
        </div>

        <div>
          <p>Student boarders:</p>
          {`${totalDormBorders} / ${totalDormSlot}`}
        </div>

        <div>
          <p>Tenants in Canteen:</p>
          {`${totalCanteenTenants} / ${totalCanteenSlot}`}{' '}
        </div>
      </SummaryContainer>
    </Card>
  );
}

export default Summary;
