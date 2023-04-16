import React from 'react';
import styled from 'styled-components';

import NoData from '../../assets/no-data.svg';

function NotExists() {
  return (
    <Container>
      <Img src={NoData} alt="no-data.svg" />
      <h1>This user does not exist</h1>
    </Container>
  );
}

export default NotExists;

const Container = styled.div`
  padding-top: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  align-self: center;
  gap: 1em;

  h1 {
    font-size: 1.25em;
  }
`;

const Img = styled.img`
  margin-right: 2em;
  width: 30%;
`;
