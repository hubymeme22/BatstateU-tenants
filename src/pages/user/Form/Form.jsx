import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

import FormContent from '../../../components/Form/FormContent';

import {
  userInitialState,
  billingInitialState,
} from '../../../services/format/FormState';
import {
  getStudentBilligns,
  getStudentDetails,
} from '../../../services/request';
import Download from './components/Download';

function Form() {
  const [userInfo, setUserInfo] = useState(userInitialState);
  const [userBillings, setUserBillings] = useState(billingInitialState);

  // Fetch Student details
  React.useEffect(() => {
    const getData = async () => {
      const fetchedData = await getStudentDetails();
      setUserInfo(fetchedData.data.userinfo);
    };
    getData();
  }, []);

  // Fetch student billings
  React.useEffect(() => {
    const getData = async () => {
      const fetchedData = await getStudentBilligns();
      setUserBillings(fetchedData.data.billing);
    };
    getData();
  }, []);

  // for rgo admins forms

  return (
    <FormContainer>
      <FormContent userInfo={userInfo} userBillings={userBillings} />
      <Download />
    </FormContainer>
  );
}

export default Form;

export const FormContainer = styled.div`
  @page {
    size: A 4px;
    margin: 1em -1.5em;
  }
  gap: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
