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
          {data.map((slot, index) => {
            const id = slot._id;
            const room = slot.slot;
            const max = slot.max_slot;
            const users = slot.users;

            return (
              <Details key={id} onClick={() => openDetails(id)}>
                <p>{room}</p>
                <p>{`${users.length} / ${max}`}</p>
              </Details>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export default Dorm;
