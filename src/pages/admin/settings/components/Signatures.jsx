import React from 'react';
import { SignatureContainer } from '../styled';

import useInput from '../../../../hooks/useInput';

function Signatures() {
  const [preparedBy, preparedByHandler, resetPreparedBy] = useInput('');
  const [reviewedBy, reviewedByHandler, resetReviewedBy] = useInput('');
  const [checkedBy, checkedByHandler, resetCheckedBy] = useInput('');

  return (
    <SignatureContainer>
      <div>
        <p>Prepared By: </p>
        <input type="text" placeholder="RGO Staff" {...preparedByHandler} />
        <input type="file" name="" id="" accept="image/png" />
        <button>Save</button>
      </div>

      <div>
        <p>Reviewed By: </p>
        <input type="text" placeholder="RGO Staff" {...reviewedByHandler} />
        <input type="file" name="" id="" accept="image/png" />
        <button>Save</button>
      </div>

      <div>
        <p>Check and Verified By: </p>
        <input
          type="text"
          placeholder="Senior Book Keeper"
          {...checkedByHandler}
        />
        <input type="file" name="" id="" accept="image/png" />
        <button>Save</button>
      </div>
    </SignatureContainer>
  );
}

export default Signatures;
