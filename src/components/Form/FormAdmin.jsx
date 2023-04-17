import React from 'react';

import { Container, Watermark } from './Styled';

import Header from './contents/1Header';
import ControlNum from './contents/2ControlNum';
import TenantInfo from './contents/3TenantInfo';
import Penalty from './contents/4Penalty';
import SpaceRental from './contents/5SpaceRental';
import Tit from './contents/Tit';
import Utility from './contents/6Utility';
import AmountDue from './contents/7AmountDue';
import Note from './contents/8Note';
import FormSig from './contents/9FormSig';

function FormContent(props) {
  const { userInfo, userBillings, roomID } = props;

  // Destruct user info and billings
  const { first, last } = userInfo.details.name;
  const { roomRentalFee, space, utility, dueDate } = userBillings;

  return (
    <Container Id='userForm'>
      <Header />
      <ControlNum />
      <TenantInfo name={`${first} ${last}`} loc={roomID} rent={roomRentalFee} />
      <Penalty />
      <SpaceRental
        prev={space.previousBalance}
        amount={space.currentBalance}
        total={space.totalBalance}
        month={dueDate.month}
        day={dueDate.day}
        year={dueDate.year}
      />
      <Tit />
      <Utility
        prev={utility.previousBalance}
        amount={utility.currentBalance}
        total={utility.totalBalance}
        month={dueDate.month}
        day={dueDate.day}
        year={dueDate.year}
      />
      <AmountDue
        spaceTotal={space.totalBalance}
        utilityTotal={utility.totalBalance}
      />
      <Note />
      <FormSig />

      {userBillings.isPaid ? <Watermark /> : null}
    </Container>
  );
}

export default FormContent;
