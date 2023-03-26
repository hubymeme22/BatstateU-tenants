import React from 'react';
import styled from 'styled-components';
function FromTo() {
  return (
    <Container>
      <Con>From: Administrator</Con>
      <Con>To: User</Con>
    </Container>
  );
}

export default FromTo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Con = styled.p`
  font-size: 15px;
`;
