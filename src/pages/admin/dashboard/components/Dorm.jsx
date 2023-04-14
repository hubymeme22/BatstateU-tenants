import React from 'react';

import { Card, Title, Header, Details, Contents } from '../styled';

function Dorm({ data, openDetails }) {
  return (
    <Card>
      <div>
        <Title> DORMITORY </Title>
        <hr />

        <Header>
          <p>ROOM NUMBER</p>
          <p>NO. OF OCCUPANTS</p>
        </Header>

        <hr />
      </div>

      {/* Display list of Room slots data */}
      <Contents>
        {data.length > 0 &&
          data.map((room) => {
            const { _id, label, slot, max_slot, users } = room;

            return (
              <Details key={_id} onClick={() => openDetails(slot, label)}>
                <p>{slot}</p>
                <p>{`${users.length} / ${max_slot}`}</p>
              </Details>
            );
          })}
      </Contents>
    </Card>
  );
}

export default Dorm;
