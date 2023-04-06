import React from 'react';

import {
  Button,
  ModalStyling,
  StyledModalStatement,
  Watermark,
} from './styled';

import FormContent from '../../../../../components/Form/FormContent';

function ModalStatement(props) {
  const { isOpen, toggleModal } = props;
  const { userInfo, userBillings } = props;

  return (
    <StyledModalStatement
      isOpen={isOpen}
      onRequestClose={toggleModal}
      style={ModalStyling}
    >
      <FormContent userInfo={userInfo} userBillings={userBillings} />

      {/* <Watermark /> */}

      <Button>Mark as Paid</Button>
    </StyledModalStatement>
  );
}

export default ModalStatement;
