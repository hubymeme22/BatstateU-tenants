import React, { useEffect, useReducer, useState } from 'react';

import { Bill, Title, Button, Container, ButtonContainer } from './styled';

// Components
import Header from './Header';
import BillContent from './BillContent';
import { daysBetweenDates } from '../../utils/date';

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

const initialState = {
  // Dates
  start_date: '',
  end_date: '',
  days_in_between: 0,

  // Readings
  previous_kwh: 0,
  current_kwh: 0,
  total_kwh: 0,
  rate: 0,
  total_amount: 0,
  bill_per_individual: 0,

  // Fees
  rent: 1000,
  water: 100,
  overall_bill: 0,
};

function BillingCard({ tenants, roomDetails, toggleInvoice, toggleModal }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [month, setMonth] = useState(null);

  const saveBillingStatement = (e) => {
    e.preventDefault();

    console.clear();
    console.table(state);

    // split date
    const month = new Date(state.end_date).getMonth();
    const day = new Date(state.end_date).getDay() + 1;
    const year = new Date(state.end_date).getFullYear();

    console.log(month, day, year);
  };

  const handleChange = (e) => {
    dispatch({
      type: e.target.name,
      value: e.target.value,
    });
  };

  const resetValues = () => {
    dispatch({ type: 'reset', value: initialState });
  };

  const goBack = () => {
    toggleInvoice();
    toggleModal();
    // openDetails(roomDetails.slot, roomDetails.label);
  };

  // Compute days in between
  useEffect(() => {
    if (state.start_date == '' || state.end_date == '') {
      dispatch({ type: 'days_in_between', value: 0 });
      return;
    }

    const startDate = new Date(state.start_date);
    const endDate = new Date(state.end_date);
    const days = daysBetweenDates(startDate, endDate);

    //
    dispatch({ type: 'days_in_between', value: days });
  }, [state.start_date, state.end_date]);

  // Compute total bill
  useEffect(() => {
    const { previous_kwh, current_kwh, rate, rent, water } = state;
    const total_kwh = current_kwh - previous_kwh;

    if (total_kwh < 0) return;

    const computation = total_kwh * rate;
    const electricBillPerIndividual = computation / roomDetails.userinfo.length;
    const overallBill = rent + water + electricBillPerIndividual;

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
    state.water,
    state.rent,
  ]);

  useEffect(() => {
    const monthIndex = new Date(state.end_date).getMonth();
    setMonth(monthIndex);
  }, [state.end_date]);

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
