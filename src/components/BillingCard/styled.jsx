import styled from 'styled-components';

// Bill Container
export const Bill = styled.div`
  background-color: #d9d9d9;

  padding: 1rem;

  border: 1px solid black;
  border-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

export const StyledHeader = styled.header`
  text-align: center;
  font-size: 0.8rem;

  & > p:nth-child(2) {
    font-size: 1.1rem;
    letter-spacing: 0.175em;
  }

  & > p:nth-child(4) {
    font-weight: bold;
  }
`;

export const LineBreak = styled.hr`
  border-top: 1px solid black;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 1.25rem;
`;

export const BillingDetails = styled.div``;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 250px 1fr;

  & > div:nth-child(3) {
    grid-column: 1 / 3;
  }

  input {
    text-align: center;
    margin: 0 auto;
    width: 150px;

    padding: 0.25rem;
    border-radius: 5px;
    border: 0;
  }
`;

export const RentDate = styled.section`
  display: flex;
  gap: 1rem;

  fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
  }
`;

export const Computation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;

  div {
    width: 50%;
    align-self: end;
    text-align: end;
    padding-top: 10px;
  }
`;

export const Total = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    display: inline-block;
    border-bottom: 1px solid black;
    text-align: center;
    width: 150px;
  }
`;

export const Table = styled.table`
  text-align: center;

  width: 100%;
  border-collapse: collapse;
  border-width: 1px;
  border-style: solid;
  color: #000000;

  td,
  th {
    border-width: 1px;
    border-color: black;
    border-style: solid;
    width: 1px;
  }

  td {
    padding: 10px;
  }

  input {
    width: 100%;
  }

  p {
    width: 100%;
  }
`;

export const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  font-weight: bold;
`;

export const TenantDetails = styled(Columns)`
  font-size: 0.8rem;
  font-weight: normal;
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ButtonContainer = styled.div`
  margin-right: 1rem;
  align-self: end;
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button`
  align-self: end;
  background-color: ${(props) => props.color || 'red'};
  border: 0;
  padding: 0.25rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
