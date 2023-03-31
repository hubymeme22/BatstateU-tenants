import React from 'react';
import styled from 'styled-components';
function Note() {
  return (
    <NoteTable>
      NOTE: Please settle your account at the University Cashier on or before
      the 7th day of the following month without the need of any demand. <br />
      Disregard this notice if payment has been made.{' '}
    </NoteTable>
  );
}

export default Note;
const NoteTable = styled.div`
  border: 1px solid;
  border-top: none;
  height: 55px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
`;
