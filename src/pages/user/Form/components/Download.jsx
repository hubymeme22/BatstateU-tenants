import React from 'react';
import styled from 'styled-components';
function Download() {
  return (
    <Con id='downloadButton'>
      <Button onClick={() => print()}>Download</Button>
    </Con>
  );
}

export default Download;
const Button = styled.button`
  padding: 2px;
  border-radius: 5px; ;
`;
const Con = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
`;
