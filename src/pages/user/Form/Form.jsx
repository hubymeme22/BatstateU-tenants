import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

import FormContent from '../../../components/Form/FormContent';
import Download from './components/Download';

import { userInitialState, billingInitialState } from '../../../data/FormState';

function Form() {
  const [userInfo, setUserInfo] = useState(userInitialState);
  const [userBillings, setUserBillings] = useState(billingInitialState);

  // Fetch Student details
  React.useEffect(() => {
    const getData = async () => {
      const fetchedData = await axios.get(
        'http://localhost:5050/api/student/details'
      );
      setUserInfo(fetchedData.data.userinfo);
    };
    getData();
  }, []);

  // Fetch student billings
  React.useEffect(() => {
    const getData = async () => {
      const fetchedData = await axios.get(
        'http://localhost:5050/api/student/billing/finalized'
      );
      setUserBillings(fetchedData.data.billing);
    };
    getData();
  }, []);

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
