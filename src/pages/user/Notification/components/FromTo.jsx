import React from 'react';
import styled from 'styled-components';
function FromTo(props) {
  return (
    <Container>
      <Title>From: Admin</Title>
      <Title>Subject: {props.subj}</Title>
    </Container>
  );
}

export default FromTo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
``;
