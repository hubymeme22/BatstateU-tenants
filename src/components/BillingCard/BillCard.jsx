import React, { useEffect, useReducer } from 'react';

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
  previous_kwh: '',
  current_kwh: '',
  total_kwh: 0,
  rate: '',
  total_amount: 0,
  bill_per_individual: 0,

  // Fees
  rent: 1000,
  water: 100,
  overall_bill: 0,
};

function BillingCard({ tenants, roomDetails }) {
  const [state, dispatch] = useReducer(reducer, initialState);

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

    if (!previous_kwh || !current_kwh) {
      return;
    }

    const total_kwh = current_kwh - previous_kwh;

    if (total_kwh <= 0) return;
    dispatch({ type: 'total_kwh', value: total_kwh });

    if (!rate || !rent || !water) {
      dispatch({ type: 'over_all_bill', value: 0 });
      return;
    }

    const computation = total_kwh * rate;
    const electricBillPerIndividual = computation / 4;
    const overallBill = rent + water + electricBillPerIndividual;

    dispatch({ type: 'total_amount', value: computation });
    dispatch({
      type: 'bill_per_individual',
      value: electricBillPerIndividual,
    });
    dispatch({ type: 'overall_bill', value: overallBill });
  }, [state.previous_kwh, state.current_kwh, state.rate]);

  return (
    <Container>
      <Bill>
        <Header />
        <Title>Billing Statement</Title>
        <BillContent
          tenants={tenants}
          state={state}
          handleChange={handleChange}
          saveBilling={saveBillingStatement}
        />
      </Bill>

      <ButtonContainer>
        <Button color="#777777" onClick={resetValues}>
          Clear
        </Button>
        <Button color="#66e95f" form="billing-form" type="submit">
          Save
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default BillingCard;
