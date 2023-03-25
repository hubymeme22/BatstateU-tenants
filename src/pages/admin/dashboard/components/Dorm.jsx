import React from 'react';
import styled from 'styled-components';

import { Card, Title, Details } from '../styled';

function Dorm({ data, openDetails }) {
  return (
    <Card>
      <Title> DORMITORY </Title>
      <hr />
      <div>
        <Details>
          <p>ROOM NUMBER</p>
          <p>NO. OF OCCUPANTS</p>
        </Details>

        <hr />

        {/* Display list of Room slots data */}
        <div>
          {data.map((slot, index) => {
            const id = slot._id;
            const room = slot.slot;
            const available = slot.available_slot;
            const max = slot.max_slot;
            const users = slot.users;

            return (
              <Room key={id} onClick={() => openDetails(slot)}>
                <p>{room}</p>
                <p>{`${max - available} / ${max}`}</p>
              </Room>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export default Dorm;

const Room = styled(Details)`
  cursor: pointer;
`;
