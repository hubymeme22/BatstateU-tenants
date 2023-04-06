import React from 'react';

import { ModalStyling, StyledModalStatement, Watermark } from './styled';
import FormContent from '../../../../../components/Form/FormContent';

function ModalStatement(props) {
  const { isOpen, toggleModal } = props;

  return (
    <StyledModalStatement
      isOpen={isOpen}
      onRequestClose={toggleModal}
      style={ModalStyling}
    >
      <FormContent />

      <Watermark />
    </StyledModalStatement>
  );
}

export default ModalStatement;
