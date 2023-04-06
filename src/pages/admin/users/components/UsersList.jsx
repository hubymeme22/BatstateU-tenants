import React from 'react';
import { ColumnTitles, UserDetails } from '../styled';

function UsersList({ list }) {
  return (
    <>
      <ColumnTitles>
        <p>SR-CODE</p>
        <p>First Name</p>
        <p>Last Name</p>
        <p>Contact</p>
        <p>Verified</p>
        <p>Unit Number</p>
      </ColumnTitles>

      <div>
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
      </div>
    </>
  );
}

export default UsersList;

// srcode  first  last  contact  verified  unitNumber
