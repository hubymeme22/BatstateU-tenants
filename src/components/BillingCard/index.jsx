import React from 'react';

import { Bill, LineBreak } from './styled';

// Components
import Title from './Title';

function BillingCard() {
  return (
    <Bill>
      <Title />
      <LineBreak />

      <div>
        <h1>Billing Statement</h1>
        <p>Date: Current Date</p>
        <p>Room Number: Room Number</p>
      </div>

      <form>
        {/* Boarders Details */}
        <div>
          Name: Status:
          {/* Map users  */}
        </div>

        <div></div>
      </form>
    </Bill>
  );
}

export default BillingCard;
