import styled from 'styled-components';
import ReactModal from 'react-modal';

export const InfoCardModal = styled(ReactModal)`
  padding: 2rem;
  background-color: white;
  width: 600px !important;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  outline: 0;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const Table = styled.table`
  width: 100%;
  background-color: #ffffff;
  border-collapse: collapse;
  border-width: 2px;
  border-color: #000000;
  border-style: solid;
  color: #000000;

  td {
    border-width: 2px;
    border-color: #000000;
    border-style: solid;
    padding: 3px;
  }

  tr > td:first-child {
    text-align: center;
    width: 150px;
  }

  tr > td:last-child {
    padding-left: 1rem;
  }
`;
