import React from 'react';

import { ModalStyling } from '../../../../../styles/common/modal';
import { InfoCardModal, Table, ButtonContainer } from './styled';
import Button from '../../../../../components/ui/Button';

function InfoCard(props) {
  const { isOpen, toggleModal, userData } = props;
  const { username, contact, email, roomID, status } = userData;
  const { first, middle, last } = userData.name;

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
            <td>{roomID}</td>
          </tr>
          <tr>
            <td>STATUS</td>
            <td>{status}</td>
          </tr>
        </tbody>
      </Table>

      <ButtonContainer>
        <Button onClick={toggleModal}>Cancel</Button>
        <Button primary>Save</Button>
      </ButtonContainer>
    </InfoCardModal>
  );
}

export default InfoCard;
