import React, { useEffect, useReducer, useState } from 'react';

import { Bill, Title, Button, Container, ButtonContainer } from './styled';

// Components
import Header from './Header';
import BillContent from './BillContent';

// Utils
import { daysBetweenDates } from '../../utils/date';
import { createBilling } from '../../services/request';
import { getTokenCookie } from '../../utils/tokenHandler';
import { parseObject } from '../../utils/parser';

import { invoiceInitialState } from '../../services/format/FormState';

const reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return { ...action.value };
    case action.type:
      if (action.type == 'start_date' || action.type == 'end_date') {
        return { ...state, [action.type]: action.value };
      }

      return { ...state, [action.type]: Number(action.value) };
    default:
      return state;
  }
};

function BillingCard({ tenants, roomDetails, toggleInvoice, toggleModal }) {
  const [state, dispatch] = useReducer(reducer, invoiceInitialState);
  const [month, setMonth] = useState(null);

  const saveBillingStatement = async (e) => {
    e.preventDefault();

    // destruct state
    const { rate, previous_kwh, current_kwh } = state;
    const { days_present, waterBill, roomBill } = state;

    // split date
    let date = state.end_date.split('-');

    const month = Number(date[1]);
    const day = Number(date[2]);
    const year = Number(date[0]);

    const selectedTenantsList = tenants.map((tenant) => tenant.username);

    const postData = {
      rate,
      previous_kwh,
      current_kwh,
      waterBill,
      roomBill,
    };

    let parsedData = parseObject(postData);

    let newPostData = {
      ...parsedData,
      month,
      day,
      year,
      days_present,
      users: selectedTenantsList,
      token: getTokenCookie(),
    };

    const response = await createBilling(roomDetails.slot, newPostData);

    if (response.data.error == '') {
      toggleInvoice();
    }
  };

  const handleChange = (e) => {
    dispatch({
      type: e.target.name,
      value: e.target.value,
    });
  };

  const resetValues = () => {
    dispatch({ type: 'reset', value: invoiceInitialState });
  };

  const goBack = () => {
    toggleInvoice();
    toggleModal();
  };

  // Compute days in between
  useEffect(() => {
    if (state.start_date == '' || state.end_date == '') {
      dispatch({ type: 'days_present', value: 0 });
      return;
    }

    const startDate = new Date(state.start_date);
    const endDate = new Date(state.end_date);
    const days = daysBetweenDates(startDate, endDate);

    //
    dispatch({ type: 'days_present', value: days });
  }, [state.start_date, state.end_date]);

  // Compute total bill
  useEffect(() => {
    const { previous_kwh, current_kwh, rate, roomBill, waterBill } = state;
    const total_kwh = current_kwh - previous_kwh;

    if (total_kwh < 0) return;

    const computation = total_kwh * rate;
    const electricBillPerIndividual = computation / roomDetails.userinfo.length;
    const overallBill = roomBill + waterBill + electricBillPerIndividual;

    dispatch({ type: 'total_kwh', value: total_kwh });
    dispatch({ type: 'total_amount', value: computation });
    dispatch({
      type: 'bill_per_individual',
      value: electricBillPerIndividual,
    });
    dispatch({ type: 'overall_bill', value: overallBill });
  }, [
    state.previous_kwh,
    state.current_kwh,
    state.rate,
    state.waterBill,
    state.roomBill,
  ]);

  useEffect(() => {
    const monthIndex = new Date(state.start_date).getMonth();
    setMonth(monthIndex);
  }, [state.start_date]);

  return (
    <Container>
      <Bill>
        <Header />
        <Title>Billing Statement</Title>
        <BillContent
          roomDetails={roomDetails}
          tenants={tenants}
          state={state}
          handleChange={handleChange}
          saveBilling={saveBillingStatement}
          month={month}
        />
      </Bill>

      <ButtonContainer>
        <Button color="#777777" onClick={goBack}>
          Cancel
        </Button>

        <div>
          <Button color="#777777" onClick={resetValues}>
            Clear
          </Button>
          <Button color="#66e95f" form="billing-form" type="submit">
            Save
          </Button>
        </div>
      </ButtonContainer>
    </Container>
  );
}

export default BillingCard;
