import React, { useReducer } from 'react';

import { Bill, Title, Button, Container, ButtonContainer } from './styled';

// Components
import Header from './Header';
import BillContent from './BillContent';

const reducer = (state, action) => {
  switch (action.type) {
    case 'startDate':
      return { ...state, startDate: action.value };
    case 'endDate':
      return { ...state, endDate: action.value };
    case 'rentFee':
      return { ...state, rentFee: action.value };
    case 'previousReading':
      return { ...state, previousReading: action.value };
    case 'presentReading':
      return { ...state, presentReading: action.value };
    case 'ratePerKwh':
      return { ...state, ratePerKwh: action.value };
    case 'waterFee':
      return { ...state, waterFee: action.value };
    case 'reset':
      return { ...action.value };
    default:
      return { ...state };
  }
};

const initialState = {
  startDate: '',
  endDate: '',
  rentFee: 1000,
  previousReading: '',
  presentReading: '',
  ratePerKwh: '',
  waterFee: 100,
};

function BillingCard({ tenants }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const saveBillingStatement = (e) => {
    e.preventDefault();

    console.clear();
    console.table(state);
  };

  const handleChange = (e) => {
    dispatch({ type: e.target.name, value: e.target.value });
  };

  const resetValues = () => {
    dispatch({ type: 'reset', value: initialState });
  };

  return (
    <Container>
      <Bill>
        <Header />
        <Title>Billing Statement</Title>
        <BillContent
          tenants={tenants}
          state={state}
          handleChange={handleChange}
          save={saveBillingStatement}
        />
      </Bill>

      <ButtonContainer>
        <Button color="#777777" onClick={resetValues}>
          Clear
        </Button>
        <Button
          color="#66e95f"
          // onClick={saveBillingStatement}
          form="billing-form"
          type="submit"
        >
          Save
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default BillingCard;
