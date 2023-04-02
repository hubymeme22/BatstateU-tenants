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
  Button,
} from './styled';

function BillContent({ tenants }) {
  return (
    <Form>
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
        {/* Rent Date*/}
        <RentDate>
          <fieldset>
            <label htmlFor="">Starting Date</label>
            <input type="date" />
          </fieldset>

          <fieldset>
            <label htmlFor="">End Date</label>
            <input type="date" />
          </fieldset>

          <fieldset>
            <label htmlFor="rent">Rent: </label>
            <input
              type="number"
              placeholder="Enter amount"
              min="0"
              defaultValue={1000}
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
                <input type="number" min="0" />
              </td>
              <td>
                <input type="number" min="0" />
              </td>
              <td>kwh</td>
              <td>
                <input type="number" min="0" />
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
                  defaultValue={100}
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
          <Button>Save</Button>
        </Total>
      </Summary>
    </Form>
  );
}

export default BillContent;
