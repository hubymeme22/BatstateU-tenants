import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Container } from '../Styled';
import ControlNum from './2ControlNum';
import Header from './1Header';
import Penalty from './4Penalty';
import TenantInfo from './3TenantInfo';
import SpaceRental from './5SpaceRental';
import Tit from './Tit';
import Utility from './6Utility';
import AmountDue from './7AmountDue';
import Note from './8Note';
import FormSig from './9FormSig';

function FormContent() {
  const [names, setName] = React.useState({ first: '', last: '' });
  const [info, setInfo] = React.useState({ roomRentalFee: '', roomID: '' });
  const [space, setSpace] = React.useState({
    previousBalance: '',
    currentBalance: '',
    totalBalance: '',
  });

  const [due, setDue] = React.useState({ month: '', day: '', year: '' });
  React.useEffect(() => {
    const getData = async () => {
      const fetchedData = await axios.get(
        'http://localhost:5050/api/student/billing/finalized'
      );

      setSpace(fetchedData.data.billing.space);
      setDue(fetchedData.data.billing.dueDate);
      setInfo(fetchedData.data.billing);
    };
    getData();
  }, []);
  React.useEffect(() => {
    const getData = async () => {
      const fetchedData = await axios.get(
        'http://localhost:5050/api/student/details'
      );
      setName(fetchedData.data.userinfo.details.name);
    };
    getData();
  }, []);
  console.log(names);
  return (
    <Container Id='userForm'>
      <Header />
      <ControlNum />
      <TenantInfo
        first={names.first}
        last={names.last}
        loc={info.roomRentalFee}
        rent={info.roomID}
      />
      <Penalty />
      <SpaceRental
        prev={space.previousBalance}
        amount={space.currentBalance}
        total={space.totalBalance}
        month={due.month}
        day={due.day}
        year={due.year}
      />
      <Tit />
      <Utility />
      <AmountDue />
      <Note />
      <FormSig />
    </Container>
  );
}

export default FormContent;
