import React, { useState } from 'react';

import { Bill, LineBreak, Table, Title as ContentTitle } from './styled';
import { Upper, Details, Tenants, Form } from './styled';

// Components
import Title from './Title';

function BillingCard() {
  const [tenants, setTenants] = useState([]);

  return (
    <Bill>
      <Title />
      <LineBreak />
      {/* Upper */}
      <Upper>
        <Details>
          <ContentTitle>Billing Statement</ContentTitle>
          <p>Date: Current Date</p>
          <p>Room Number: Room Number</p>
          <p>Occupants: 0 / 0</p>
        </Details>

        {/* Display Users */}
        <Tenants>
          {/* Grid */}
          {/* SR-CODE === NAME === STATUS */}
        </Tenants>

        <Form>
          {/* Rent */}
          <div>
            <label htmlFor="rent">Rent: </label>
            <input type="text" placeholder="Enter amount" />
          </div>

          {/* Table */}

          <Table>
            <thead>
              <tr>
                <th>Previous Reading</th>
                <th>Present Reading</th>
                <th>Total KwH</th>
                <th>Rate / KwH</th>
                <th>Total Amount Due</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>kwh</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Form>
      </Upper>
      {/* Lower */}
      <div></div>
    </Bill>
  );
}

export default BillingCard;
