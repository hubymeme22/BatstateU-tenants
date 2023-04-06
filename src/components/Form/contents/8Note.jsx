import React from 'react';
import styled from 'styled-components';
function Note() {
  return (
    <NoteTable>
      <em>NOTE:</em> Please settle your account at the University Cashier on or
      before the 7th day of the following month without the need of any demand.
      Disregard this notice if payment has been made.{' '}
    </NoteTable>
  );
}

export default Note;

const NoteTable = styled.div`
  border: 1px solid;
  border-top: none;
  width: 100%;
  padding: 2px;
  font-size: 14px;

  em {
    font-weight: bold;
  }
`;
