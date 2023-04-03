import React from 'react';
import {
  BillingDetails,
  Table,
  Columns,
  TenantDetails,
  Form,
  RentDate,
  Computation,
  Summary,
  Total,
} from './styled';

function BillContent({ tenants, handleChange, state, saveBilling }) {
  return (
    <Form id="billing-form" onSubmit={(e) => saveBilling(e)}>
      {/* Billing Details */}
      <BillingDetails>
        <div>
          <p>Date: Current Date</p>
          <p>Room Number: Room Number</p>
          <p>Occupants: {tenants.length} / 4</p>
        </div>

        {/* Display Users */}
        <div>
          <Columns>
            <p>SR CODE</p>
            <p>NAME</p>
          </Columns>

          {tenants.map((tenant) => {
            return (
              <TenantDetails key={tenant.username}>
                <p>{tenant.username}</p>
                <p>
                  {tenant.name.first} {tenant.name.last}
                </p>
              </TenantDetails>
            );
          })}
        </div>
      </BillingDetails>

      <Computation>
        <RentDate>
          {/* Start Date */}
          <fieldset>
            <label htmlFor="">Starting Date</label>
            <input
              type="date"
              name="startDate"
              value={state.startDate}
              onChange={(e) => handleChange(e)}
              required
            />
          </fieldset>

          {/* End Date */}
          <fieldset>
            <label htmlFor="">End Date</label>
            <input
              type="date"
              name="endDate"
              value={state.endDate}
              onChange={(e) => handleChange(e)}
              required
            />
          </fieldset>

          {/* Number of Days */}
          <fieldset>
            <label>Days</label>
            <input type="text" value="30" disabled />
          </fieldset>

          {/* Rent */}
          <fieldset>
            <label htmlFor="rent">Rent: </label>
            <input
              type="number"
              placeholder="Enter amount"
              min="0"
              name="rentFee"
              value={state.rentFee}
              onChange={(e) => handleChange(e)}
              required
            />
          </fieldset>
        </RentDate>

        {/* Compute Bill */}
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
                <input
                  type="number"
                  min="0"
                  name="previousReading"
                  value={state.previousReading}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  name="presentReading"
                  value={state.presentReading}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </td>
              <td>kwh</td>
              <td>
                <input
                  type="number"
                  min="0"
                  name="ratePerKwh"
                  value={state.ratePerKwh}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Computation>

      {/* Summary */}

      <Summary>
        <Table>
          <tbody>
            <tr>
              <td rowSpan={4}>
                Other Charges and Utility Bills (water bill) (100 Php common
                area Electric bill)(Current Electric Bill){' '}
              </td>
            </tr>

            <tr>
              <th>Month</th>
              <th>Electric Bill</th>
              <th>Water Bill</th>
              <th>Amount</th>
            </tr>

            <tr>
              <td>selected month</td>
              <td>electric bill + 100 </td>
              <td>
                <input
                  type="number"
                  placeholder="amount"
                  min="0"
                  name="waterFee"
                  value={state.waterFee}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </td>
              <td>Sum</td>
            </tr>

            <tr>
              <td colSpan={3} style={{ textAlign: 'end' }}>
                Total
              </td>
              <td>AMOUNT</td>
            </tr>
          </tbody>
        </Table>

        <Total>
          <p>
            Total Accounts Payable: <span>P 1000+ </span>
          </p>
        </Total>
      </Summary>
    </Form>
  );
}

export default BillContent;
