import React, { useState, useEffect } from 'react';
import { BillingHeaderContainer } from '../styled';

import {
  getBillingHeader,
  updateBillingHeader,
  updateBillingLogo
} from '../../../../services/request';

import { showSuccessToast, showErrorToast } from '../../../../utils/toast';
import useFile from '../../../../hooks/useFile';

function BillingHeader() {
    const [referenceNumber, setReferenceNumber] = useState('');
    const [effectivityDate, setEffectivityDate] = useState('');
    const [revision, setRevision] = useState('');

    // placeholders for images
    const [logoBSU, selectLogoBSU] = useFile();


  useEffect(() => {
    const getData = async () => {
      const { data } = await getBillingHeader();
      const { referenceNumber, effectivityDate, revision } = await data.billing;

      setReferenceNumber(referenceNumber);
      setEffectivityDate(effectivityDate);
      setRevision(revision);
    };

    getData();
  }, []);



  const saveBillingHeader = async (updateData, data) => {
    const updateBillingHeaderResponse = await updateBillingHeader(updateData, data) ;
    if (
      !updateBillingHeaderResponse.data.updated
    ){
      showErrorToast('Something went wrong, please try again.'); 
      return;
    }
    showSuccessToast('Header updated!');
  };

  const saveBillingLogo = async (img) => {
    const updateHeaderLogoResponse = await updateBillingLogo(img)
    if(
      !updateHeaderLogoResponse.data.uploaded
    ){
      showErrorToast('Logo does not exist, try again.');
      return;
    }
    showSuccessToast('Logo updated!');
  };


  return (
    <BillingHeaderContainer>
      <h1> Change Header details in Billing</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveBillingHeader(referenceNumber, 'referenceNumber');
        }}
      >
        <p>Reference Number: </p>
        <input
          type="text"
          name="Reference Number"
          placeholder="Reference Number"
          autoComplete="off"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          required
        />

        
        <button>Save</button>
      </form>

        
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveBillingHeader(effectivityDate, 'effectivityDate');
        }}
      >
        <p>Effectivity Date: </p>
        <input
          type="text"
          name="Effectivity Date"
          placeholder="Effectivity Date"
          autoComplete="off"
          value={effectivityDate}
          onChange={(e) => setEffectivityDate(e.target.value)}
          required
        />
        <button>Save</button>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveBillingHeader(revision, 'revision');
        }}
      >
        <p>Revision: </p>
        <input
          type="text"
          name="Revision"
          placeholder="Revision"
          autoComplete="off"
          value={revision}
          onChange={(e) => setRevision(e.target.value)}
          required
        />
        <button>Save</button>
      </form>
        
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveBillingLogo(logoBSU, selectLogoBSU)
        }}
      > 
      <p>Upload BSU logo: </p>
      <input
          type="file"
          name="logoBSU"
          accept="image/png"
          onChange={(e) => selectLogoBSU(e)}
          required
        />
      </form>
      
    </BillingHeaderContainer>
  );
}

export default BillingHeader;
