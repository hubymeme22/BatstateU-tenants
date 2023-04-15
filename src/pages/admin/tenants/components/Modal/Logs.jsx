import React from 'react';
import styled from 'styled-components';

function Logs({ list }) {
  const renderLogs = () => {
    return list.map((log, index) => {
      const {
        currentKWH,
        previousKWH,
        roomBill,
        status,
        utilityTotalPayment,
        waterBill,
      } = log;

      return (
        <Details key={index}>
          <p>{previousKWH}</p>
          <p>{currentKWH}</p>
          <p>{roomBill}</p>
          <p>{waterBill}</p>
          <p>{utilityTotalPayment}</p>
          <p>{status}</p>
        </Details>
      );
    });
  };

  return (
    <div>
      <ColumnTitles>
        <p>previous kwh</p>
        <p>current kwh</p>
        <p>roomBill</p>
        <p>waterBill</p>
        <p>Total</p>
        <p>status</p>
      </ColumnTitles>

      <hr />

      <div>{renderLogs()}</div>
    </div>
  );
}

export default Logs;

const ColumnTitles = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-items: center;
  gap: 1rem;

  font-weight: bold;
  font-size: small;
`;

const Details = styled(ColumnTitles)`
  font-weight: normal;
  font-size: large;
`;
