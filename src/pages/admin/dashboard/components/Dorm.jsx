import React from 'react';

import { Card, Title, Header, Details } from '../styled';

function Dorm({ data, openDetails }) {
  return (
    <Card>
      <Title> DORMITORY </Title>
      <hr />
      <div>
        <Header>
          <p>ROOM NUMBER</p>
          <p>NO. OF OCCUPANTS</p>
        </Header>

        <hr />

        {/* Display list of Room slots data */}
        <div>
          {data.length > 0 &&
            data.map((room, index) => {
              const { _id, label, slot, max_slot, status, users } = room;

              return (
                <Details key={_id} onClick={() => openDetails(slot, label)}>
                  <p>{slot}</p>
                  <p>{`${users.length} / ${max_slot}`}</p>
                </Details>
              );
            })}
        </div>
      </div>
    </Card>
  );
}

export default Dorm;
