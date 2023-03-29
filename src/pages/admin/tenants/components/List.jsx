import React, { useState, useEffect } from 'react';

import { ColumnTitles, UsersContainer, UserDetails } from '../styled';

import Loader from '@/components/Loader';

function List({ data, area, filter }) {
  // console.log(data);

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
        {data ? (
          Object.keys(data).map((username) => {
            // destruct details
            const { first, last } = data[username].name;
            const { roomID, contact, status } = data[username];

            return (
              <UserDetails key={username}>
                <p>{username}</p>
                <p>{first}</p>
                <p>{last}</p>
                <p>{contact}</p>
                <p>{roomID}</p>
                <p>{status}</p>
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

// data.length > 0 ? (
//   data.map((student) => {
//     const { first, last } = student.details.name;
//     return (
//       <UserDetails key={student._id}>
//         <p>{student.username}</p>
//         <p>{first}</p>
//         <p>{last}</p>

//         <p>{student.contact}</p>
//       </UserDetails>
//     );
//   })
