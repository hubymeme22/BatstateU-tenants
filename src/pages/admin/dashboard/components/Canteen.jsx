import React from 'react';

import { Card, Title, Details } from '../styled';

function Canteen({ data }) {
  return (
    <Card>
      <Title> CANTEEN </Title>
      <hr />
      <div>
        <Details>
          <p>SLOT</p>
          <p>STATUS</p>
        </Details>

        <hr />

        {/* Display list of Canteen slots data */}
        <div>
          {data.map((slot, index) => {
            const id = slot._id;
            const room = slot.slot;
            const status = slot.status;

            return (
              <Details key={id}>
                <p>{room}</p>
                <p>{status}</p>
              </Details>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export default Canteen;
