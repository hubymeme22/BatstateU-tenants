import React from 'react';

import { UsersContainer, UserDetails, Status } from '../styled';

function List({ data, area, filter, searchText, viewStatement }) {
  return (
    <UsersContainer>
      {data.length > 0 ? (
        data.map((userdata) => {
          const { username, contact, roomID, status } = userdata;
          const { first, last } = userdata.name;

          return (
            <UserDetails key={username} onClick={() => viewStatement(userdata)}>
              <p>{username}</p>
              <p>{first}</p>
              <p>{last}</p>
              <p>{contact}</p>
              <p>{roomID}</p>
              <Status indicator={status}>{status}</Status>
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
