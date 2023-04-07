import React from 'react';
import { Status, UserDetails, UsersContainer } from '../styled';

function UsersList(props) {
  const { list, toggleVerification } = props;

  const renderList = (list) => {
    return (
      <div>
        {list.map((user) => {
          const { username, contact, room, verified } = user;
          // const { first, last } = user.name;

          return (
            <UserDetails key={username}>
              <p>{username}</p>
              <p>{'first'}</p>
              <p>{'last'}</p>
              <p>{contact}</p>
              <Status
                verified={verified}
                onClick={() => toggleVerification(username, verified)}
              >
                {verified ? 'Yes' : 'No'}
              </Status>
              <p>{room}</p>
            </UserDetails>
          );
        })}
      </div>
    );
  };

  return (
    <UsersContainer>
      {list.length != 0 ? <>{renderList(list)}</> : <>Does not exist</>}
    </UsersContainer>
  );
}

export default UsersList;
