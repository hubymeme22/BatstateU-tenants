import React from 'react';
import NotExists from '../../../../components/NotExists/NotExists';

import { UsersContainer, UserDetails, Status, Room } from '../styled';
import { FaFileInvoice } from 'react-icons/fa';
import styled from 'styled-components';

function List(props) {
  const { data, viewStatement, viewTenantInfo } = props;

  return (
    <UsersContainer>
      {data.length != 0 ? (
        data.map((userdata) => {
          const { username, contact, roomID, status } = userdata;
          const { first, last } = userdata.name;

          return (
            <Container key={username}>
              <UserDetails onClick={() => viewTenantInfo(userdata)}>
                <p>{username}</p>
                <p>{first}</p>
                <p>{last}</p>
                <p>{contact}</p>
                <Room room={roomID}>{roomID}</Room>
                <Status indicator={status}>{status}</Status>
              </UserDetails>

              <FaFileInvoice onClick={() => viewStatement(userdata)} />
            </Container>
          );
        })
      ) : (
        <NotExists />
      )}
    </UsersContainer>
  );
}

export default List;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;

  &:hover {
    background-color: #b5d7ff;
  }

  svg {
    justify-self: end;
    align-self: center;
    color: #737c85;
    font-size: 1.5rem;
    cursor: help;
  }
`;
