import React, { useState, useEffect } from 'react';
import { SignatureContainer } from '../styled';

import {
  fetchAsAdmin,
  updateName,
  updateSignature,
} from '../../../../services/request';
import { showSuccessToast, showErrorToast } from '../../../../utils/toast';
import { namesInitialState } from '../../../../services/format/FormState';

import useFile from '../../../../hooks/useFile';

function Signatures() {
  const [preparedBy, setPreparedBy] = useState('');
  const [reviewedBy, setReviewedBy] = useState('');
  const [checkedBy, setCheckedBy] = useState('');

  // placeholders for images
  const [preparedByImg, selectPreparedByImg] = useFile();
  const [reviewedByImg, selectReviewedByImg] = useFile();
  const [checkedByImg, selectCheckedByImg] = useFile();

  useEffect(() => {
    const getNames = async () => {
      const { data } = await fetchAsAdmin('names');
      const { prepared, reviewed, verified } = await data.names;

      setPreparedBy(prepared);
      setReviewedBy(reviewed);
      setCheckedBy(verified);
    };

    getNames();
  }, []);

  const saveNameAndSignature = async (wholeName, signatureImg, role) => {
    if (!signatureImg) {
      showErrorToast('Signature was not uploaded');
      return;
    }

    const updateNameResponse = await updateName(wholeName, role);
    const updateSignatureResponse = await updateSignature(signatureImg, role);

    // Unsuccessful
    if (
      !updateNameResponse.data.assigned ||
      !updateSignatureResponse.data.uploaded
    ) {
      showErrorToast(`Hold up wait a minute, something ain't right`);
      return;
    }

    showSuccessToast('Successful update');
  };

  return (
    <SignatureContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveNameAndSignature(preparedBy, preparedByImg, 'prepare');
        }}
      >
        <p>Prepared By: </p>
        <input
          type="text"
          name="preparedBy"
          placeholder="RGO Staff"
          autoComplete="off"
          value={preparedBy}
          onChange={(e) => setPreparedBy(e.target.value)}
          required
        />

        <input
          type="file"
          name="preparedByImg"
          accept="image/png"
          onChange={(e) => selectPreparedByImg(e)}
          required
        />

        <button>Save</button>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveNameAndSignature(reviewedBy, reviewedByImg, 'reviewer');
        }}
      >
        <p>Reviewed By: </p>
        <input
          type="text"
          placeholder="RGO Staff"
          autoComplete="off"
          value={reviewedBy}
          onChange={(e) => setReviewedBy(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/png"
          onChange={(e) => selectReviewedByImg(e)}
          required
        />
        <button>Save</button>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveNameAndSignature(checkedBy, checkedByImg, 'verifier');
        }}
      >
        <p>Check and Verified By: </p>
        <input
          type="text"
          placeholder="Senior Book Keeper"
          autoComplete="off"
          value={checkedBy}
          onChange={(e) => setCheckedBy(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/png"
          onChange={(e) => selectCheckedByImg(e)}
          required
        />
        <button>Save</button>
      </form>
    </SignatureContainer>
  );
}

export default Signatures;
