import React from 'react';
import styled from 'styled-components';
function Buttons() {
  return (
    <Container>
      <Button>Cancel</Button>
      <Button color='green'>Confirm</Button>
    </Container>
  );
}

export default Buttons;

const Container = styled.div`
  display: flex;
  padding: 10px;
  width: 80%;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 2px;
  background-color: ${(props) =>
    props.color === 'green' ? 'green' : '#9A9A9A'};
  color: white;
  border-radius: 10px;
`;
