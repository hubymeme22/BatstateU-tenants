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
              name="start_date"
              value={state.start_date}
              onChange={(e) => handleChange(e)}
              required
            />
          </fieldset>

          {/* End Date */}
          <fieldset>
            <label htmlFor="">End Date</label>
            <input
              type="date"
              name="end_date"
              value={state.end_date}
              onChange={(e) => handleChange(e)}
              required
            />
          </fieldset>

          {/* Number of Days */}
          <fieldset>
            <label>Days</label>
            <input type="text" value={state.days_in_between} disabled />
          </fieldset>

          {/* Rent */}
          <fieldset>
            <label htmlFor="rent">Rent: </label>
            <input
              type="number"
              placeholder="Enter amount"
              min="0"
              name="rent"
              value={state.rent}
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
                  name="previous_kwh"
                  value={state.previous_kwh}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  name="current_kwh"
                  value={state.current_kwh}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </td>
              <td>{state.total_kwh}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  name="rate"
                  value={state.rate}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </td>
              <td> ₱ {state.total_amount} </td>
              <td> ₱ {state.bill_per_individual} </td>
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
              <td> ₱ {state.bill_per_individual} </td>
              <td>
                <input
                  type="number"
                  placeholder="amount"
                  min="0"
                  name="water"
                  value={state.water}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </td>
              <td> ₱ {state.bill_per_individual + state.water}</td>
            </tr>

            <tr>
              <td colSpan={3} style={{ textAlign: 'end' }}>
                Total
              </td>
              <td>₱ {state.overall_bill}</td>
            </tr>
          </tbody>
        </Table>

        <Total>
          <p>
            Total Accounts Payable: <span>₱ {state.overall_bill} </span>
          </p>
        </Total>
      </Summary>
    </Form>
  );
}

export default BillContent;
