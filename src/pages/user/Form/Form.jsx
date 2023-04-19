import React, { useState } from 'react';
import styled from 'styled-components';

import FormContent from '../../../components/Form/FormContent';
import html2pdf from 'html2pdf.js';
import {
  userInitialState,
  billingInitialState,
} from '../../../services/format/FormState';
import {
  getStudentBilligns,
  getStudentDetails,
} from '../../../services/request';

function Form() {
  const [userInfo, setUserInfo] = useState(userInitialState);
  const [userBillings, setUserBillings] = useState(billingInitialState);
  const generatePDF = () => {
    // Get the component node
    const componentNode = document.querySelector('#component');

    // Set the PDF options
    const pdfOptions = {
      margin: 0,
      filename: 'my-file.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 5 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
    };

    // Generate the PDF file
    html2pdf().set(pdfOptions).from(componentNode).save();
  };
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
      <div id='component'>
        <FormContent userInfo={userInfo} userBillings={userBillings} />
      </div>
      <Con>
        <Button onClick={generatePDF}>Download PDF</Button>
      </Con>
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

const Button = styled.button`
  padding: 2px;
  border-radius: 5px;
  background-color: #651b1b;
  color: white;
`;
const Con = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
`;
