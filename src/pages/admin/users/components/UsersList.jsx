import React from 'react';
import { UserDetails, UsersContainer } from '../styled';

function UsersList({ list }) {
  return (
    <UsersContainer>
      {list.length != 0 ? (
        list.map((user) => {
          const { username, contact, roomID } = user;
          const { first, last } = user.name;

          return (
            <UserDetails key={username}>
              <p>{username}</p>
              <p>{first}</p>
              <p>{last}</p>
              <p>{contact}</p>
              <p>{''}</p>
              <p>{roomID}</p>
            </UserDetails>
          );
        })
      ) : (
        <>Does not exist</>
      )}
    </UsersContainer>
  );
}

export default UsersList;

// srcode  first  last  contact  verified  unitNumber
