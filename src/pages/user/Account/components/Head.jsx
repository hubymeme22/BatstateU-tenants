import React from 'react';
import styled from 'styled-components';
import BSULogo from '@/assets/logo.webp';
function Head() {
  return (
    <Container>
      <Image src={BSULogo}></Image>
      <Names>FirstName Lastname</Names>
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
const Image = styled.img`
  border-radius: 50%;
  height: 90px;
  width: 90px;
  background-color: #d9d9d9;
`;
const Names = styled.h1`
  font-weight: bold;
`;
