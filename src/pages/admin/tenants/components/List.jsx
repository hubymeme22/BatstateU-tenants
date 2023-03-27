import React from 'react';

import {
  Container,
  ColumnTitles,
  UsersContainer,
  UserDetails,
} from '../styled';

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
        {data.map((student) => {
          const { first, last } = student.details.name;
          return (
            <UserDetails key={student._id}>
              <p>{student.username}</p>
              <p>{first}</p>
              <p>{last}</p>

              <p>{student.contact}</p>
            </UserDetails>
          );
        })}
      </UsersContainer>
    </>
  );
}

export default List;
