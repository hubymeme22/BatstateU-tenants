import React from 'react';

import { Button, ModalStyling, StyledModalStatement } from './styled';

import FormContent from '../../../../../components/Form/FormContent';
import Loader from '../../../../../components/Loader';

import {
  userInitialState,
  billingInitialState,
} from '../../../../../data/FormState';

function ModalStatement(props) {
  const { isOpen, toggleModal } = props;
  const { userInfo, userBillings } = props;

  return (
    <StyledModalStatement
      isOpen={isOpen}
      onRequestClose={toggleModal}
      style={ModalStyling}
    >
      {userInfo != userInitialState || userBillings != billingInitialState ? (
        <FormContent userInfo={userInfo} userBillings={userBillings} />
      ) : (
        <Loader />
      )}
      <Button>Mark as Paid</Button>
    </StyledModalStatement>
  );
}

export default ModalStatement;
