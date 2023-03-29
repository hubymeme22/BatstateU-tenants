import React from 'react';
import styled from 'styled-components';

function Loader() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

export default Loader;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  border: 10px solid #f3f3f3;
  border-top: 10px solid #121212;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
