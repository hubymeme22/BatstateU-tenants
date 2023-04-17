import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

import FormContent from '../../../components/Form/FormContent';
import Download from './components/Download';

import {
  userInitialState,
  billingInitialState,
  adminInfo,
} from '../../../services/format/FormState';
import {
  getStudentBilligns,
  getStudentDetails,
  getRGONames,
} from '../../../services/request';

function Form() {
  const [userInfo, setUserInfo] = useState(userInitialState);
  const [userBillings, setUserBillings] = useState(billingInitialState);
  const [rgoNames, setRgoNames] = useState(adminInfo);
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
  React.useEffect(() => {
    const getData = async () => {
      const fetchedData = await getRGONames();
      setRgoNames(fetchedData.data);
    };
    getData();
  }, []);

  return (
    <FormContainer>
      <FormContent
        userInfo={userInfo}
        userBillings={userBillings}
        rgoNames={rgoNames}
      />
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
