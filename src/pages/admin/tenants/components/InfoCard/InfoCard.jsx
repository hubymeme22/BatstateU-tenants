import React, { useEffect, useState } from 'react';

import { InfoCardModal, Table } from './styled';
import { ModalStyling } from '../../../../../styles/shared/modal';
import { Button, ButtonContainer } from '../../../../../styles/shared/button';

import { accountInitialState } from '../../../../../services/format/FormState';
import { fetchAsAdmin } from '../../../../../services/request';
import { sortByRoomNames } from '../../../../../utils/dataFilters';

function InfoCard(props) {
  const { isOpen, toggleModal, selectedTenant } = props;
  const { changeRoom, saveChanges } = props;

  const [tenantInfo, setTenantInfo] = useState(accountInitialState);
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    updateAvailableRooms();
  }, [isOpen]);

  useEffect(() => {
    if (!selectedTenant) return;
    setTenantInfo(selectedTenant);
  }, [selectedTenant]);

  const updateAvailableRooms = async () => {
    const { data } = await fetchAsAdmin('slots/available');
    const { slots } = await data;

    setAvailableRooms(sortByRoomNames(slots));
  };

  const renderOptions = (list) => {
    return (
      <>
        <option value="GN-01|unavailable">None</option>

        {list.length != 0 &&
          list.map((room) => {
            const { slot, label } = room;
            if (slot == 'GN-01') return;

            // Filter out the list based on the room_label of the tenant
            if (room_label != 'unavailable' && label != room_label) return;

            return (
              <option value={`${slot}|${label}`} key={room._id}>
                {slot}
              </option>
            );
          })}
      </>
    );
  };

  const { username, contact, email, roomID, room_label, status } = tenantInfo;
  const { first, middle, last } = tenantInfo.name;

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
              <select
                value={`${roomID}|${room_label}`}
                onChange={(e) => changeRoom(e)}
              >
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
