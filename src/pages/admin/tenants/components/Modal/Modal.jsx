import React from 'react';

import { Button, ModalStyling, StyledModalStatement } from './styled';

import FormContent from '../../../../../components/Form/FormContent';
import Loader from '../../../../../components/Loader';

import {
  userInitialState,
  billingInitialState,
} from '../../../../../services/format/FormState';

import { markAsPaid } from '../../../../../services/request';
import { useNavigate } from 'react-router-dom';

function ModalStatement(props) {
  const { isOpen, toggleModal } = props;
  const { userInfo, userBillings } = props;

  const navigate = useNavigate();

  const studentPayment = (username) => {
    markAsPaid(username);
    navigate(0);
  };

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
      <Button
        disabled={userBillings.isPaid}
        onClick={() => studentPayment(userInfo.srCode)}
      >
        Mark as Paid
      </Button>
    </StyledModalStatement>
  );
}

export default ModalStatement;
