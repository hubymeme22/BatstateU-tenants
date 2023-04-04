import React from 'react';

import { ColumnTitles, UsersContainer, UserDetails, Status } from '../styled';

import Loader from '@/components/Loader';

function List({ data, area, filter }) {
  return (
    <>
      <ColumnTitles>
        <p>SR-CODE</p>
        <p>First Name</p>
        <p>Last Name</p>
        <p>Contact</p>
        <p>Unit Number</p>
        <p>Status</p>
      </ColumnTitles>

      <hr />

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
                <p>{roomID}</p>
                <Status indicator={status}>{status}</Status>
              </UserDetails>
            );
          })
        ) : (
          <Loader />
        )}
      </UsersContainer>
    </>
  );
}

export default List;
