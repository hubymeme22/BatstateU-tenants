import React from 'react';

import { Card, Title, Header, Details, Contents } from '../styled';

function Canteen({ data, openDetails }) {
  return (
    <Card>
      <div>
        <Title> CANTEEN </Title>
        <hr />

        <Header>
          <p>SLOT</p>
          <p>STATUS</p>
        </Header>

        <hr />
      </div>

      {/* Display list of Canteen slots data */}
      <Contents>
        {data &&
          data.length > 0 &&
          data.map((slot, index) => {
            const id = slot._id;
            const label = slot.label;
            const room = slot.slot;
            const status = slot.status;

            return (
              <Details
                key={id}
                onClick={() => {
                  openDetails(room, label);
                }}
              >
                <p>{room}</p>
                <p>{status}</p>
              </Details>
            );
          })}
      </Contents>
    </Card>
  );
}

export default Canteen;
