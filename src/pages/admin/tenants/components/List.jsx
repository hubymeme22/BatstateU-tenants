import React from 'react';

import { UsersContainer, UserDetails, Status, Room } from '../styled';
import { FaFileInvoice } from 'react-icons/fa';

function List({ data, viewStatement }) {
  return (
    <UsersContainer>
      {data.length > 0 ? (
        data.map((userdata) => {
          const { username, contact, roomID, status } = userdata;
          const { first, last } = userdata.name;

          return (
            <UserDetails key={username}>
              <p>{username}</p>
              <p>{first}</p>
              <p>{last}</p>
              <p>{contact}</p>
              <Room room={roomID}>{roomID}</Room>
              <Status indicator={status}>{status}</Status>
              <FaFileInvoice onClick={() => viewStatement(userdata)} />
            </UserDetails>
          );
        })
      ) : (
        <>Does not exist</>
      )}
    </UsersContainer>
  );
}

export default List;
