import React from 'react';

import { ModalStyling } from '../../../../../styles/common/modal';

import { InfoCardModal } from './styled';

function InfoCard(props) {
  const { isOpen, toggleModal } = props;

  return (
    <InfoCardModal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      style={ModalStyling}
    >
      InfoCard card eto
    </InfoCardModal>
  );
}

export default InfoCard;
