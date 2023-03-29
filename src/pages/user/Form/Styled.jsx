import styled from 'styled-components';

export const Container = styled.div`
  height: 95%;
  width: 95%;
  background-color: #d9d9d9;
  border-radius: 15px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  border: 1px solid;
`;
export const FormContainer = styled.div`
  @page {
    size: A 4px;
    margin: 1em -1.5em;
  }

  gap: 5px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
