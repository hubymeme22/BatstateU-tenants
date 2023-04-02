import React from 'react';
import styled from 'styled-components';

import { FaUserCog } from 'react-icons/fa';
function Head(props) {
  return (
    <Container>
      <Image />
      <Names>{props.name}</Names>
    </Container>
  );
}

export default Head;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 10px;
`;
const Image = styled(FaUserCog)`
  border-radius: 50%;
  height: 90px;
  width: 90px;
  background-color: #d9d9d9;
`;
const Names = styled.h1`
  font-weight: bold;
`;
