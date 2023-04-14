import React from 'react';

import { InfoCardModal, Table, ButtonContainer } from './styled';
import { ModalStyling } from '../../../../../styles/shared/modal';
import { Button } from '../../../../../styles/shared/button';

import {
  doesRoomExist,
  filterByRoomLabel,
} from '../../../../../utils/dataFilters';

function InfoCard(props) {
  const { isOpen, toggleModal, userData } = props;
  const { availableRooms, changeRoom, saveChanges } = props;

  // Destruct user information
  const { username, contact, email, roomID, status, room_label } = userData;
  const { first, middle, last } = userData.name;

  const renderOptions = (list) => {
    list = filterByRoomLabel(list, room_label);

    return (
      <>
        <option value="GN-01">None</option>

        {list.length != 0 &&
          list.map((room) => {
            if (room.slot == 'GN-01') return;

            return (
              <option value={room.slot} key={room._id}>
                {room.slot}
              </option>
            );
          })}
      </>
    );
  };

  return (
    <InfoCardModal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      style={ModalStyling}
    >
      <h1>Tenant's Details</h1>

      <Table>
        <tbody>
          <tr>
            <td>SR-CODE</td>
            <td>{username}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{`${first} ${middle} ${last}`}</td>
          </tr>
          <tr>
            <td>CONTACT</td>
            <td>{contact}</td>
          </tr>
          <tr>
            <td>EMAIL</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>UNIT NUMBER</td>
            <td>
              <select value={roomID} onChange={(e) => changeRoom(e, username)}>
                {renderOptions(availableRooms)}
              </select>
            </td>
          </tr>
          <tr>
            <td>STATUS</td>
            <td>{status}</td>
          </tr>
        </tbody>
      </Table>

      <ButtonContainer>
        <Button onClick={toggleModal}>Cancel</Button>
        <Button onClick={() => saveChanges(username, roomID)} primary>
          Save
        </Button>
      </ButtonContainer>
    </InfoCardModal>
  );
}

export default InfoCard;
