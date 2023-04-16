import React from 'react';
import styled from 'styled-components';

import { monthNames } from '../../../../../utils/date';

function Logs({ list }) {
  const renderLogs = () => {
    return list.map((log, index) => {
      const {
        startDate,
        dueDate,
        currentKWH,
        previousKWH,
        roomBill,
        status,
        utilityTotalPayment,
      } = log;

      return (
        <Details key={index}>
          <p>{monthNames[startDate.month - 1]}</p>
          <p>{previousKWH}</p>
          <p>{currentKWH}</p>
          <p>{roomBill}</p>
          <p>{utilityTotalPayment.toFixed(2)}</p>
          <p>{status}</p>
          <p>{log.datePaid ? <>{log.datePaid.split('T')[0]}</> : <>???</>}</p>
        </Details>
      );
    });
  };

  return (
    <div>
      <ColumnTitles>
        <p>Month</p>
        <p>previous kwh</p>
        <p>current kwh</p>
        <p>roomBill</p>
        <p>Utility</p>
        <p>status</p>
        <p>Date Paid</p>
      </ColumnTitles>

      <hr />

      <div>{renderLogs()}</div>
    </div>
  );
}

export default Logs;

const ColumnTitles = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  gap: 1rem;

  font-weight: bold;
`;

const Details = styled(ColumnTitles)`
  font-weight: normal;
`;
