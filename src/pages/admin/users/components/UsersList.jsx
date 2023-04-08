import React from 'react';
import { AdminDetails, Status, UserDetails, UsersContainer } from '../styled';

function UsersList(props) {
  const { list, toggleVerification, type } = props;

  const renderList = () => {
    return (
      <div>
        {list.map((user) => {
          const { username, contact, room, verified, access, email } = user;
          const { first, last } = user.name;

          if (access != type) return;

          return (
            <>
              {type == 'student' ? (
                <UserDetails key={username}>
                  <p>{username}</p>
                  <p>{first}</p>
                  <p>{last}</p>
                  <p>{contact}</p>
                  <Status
                    verified={verified}
                    onClick={() => toggleVerification(username, verified)}
                  >
                    {verified ? 'Yes' : 'No'}
                  </Status>
                  <p>{room}</p>
                </UserDetails>
              ) : (
                <AdminDetails>
                  <p>{first}</p>
                  <p>{last}</p>
                  <p>{email}</p>
                </AdminDetails>
              )}
            </>
          );
        })}
      </div>
    );
  };

  return (
    <UsersContainer>
      {list.length != 0 ? <>{renderList()}</> : <>Does not exist</>}
    </UsersContainer>
  );
}

export default UsersList;
