import styled from 'styled-components';

export const Bill = styled.div`
  background-color: #d9d9d9;
  height: 100%;
  padding: 1rem;

  border: 1px solid black;
  border-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

export const Header = styled.header`
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
    padding: 3px;
  }

  p {
    width: 100%;
  }

  input {
    margin: 0 auto;
    width: 100px;
  }
`;
export const Upper = styled.section`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 0.5fr 150px;
`;

export const Details = styled.div`
  background-color: blue;
`;

export const Tenants = styled.div`
  grid-row: 2;
  background-color: red;
  height: 100%;
`;

export const Form = styled.form`
  background-color: green;
  grid-row: 1 / 3;
`;
