import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from '../components/sidebar';

function Main() {
  return (
    <MainContainer>
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  background-color: #333;
  padding: 1em;
  min-height: 100vh;
  display: flex;
  gap: 1em;
`;

const Content = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.gray};
  border-radius: 10px;
  padding: 2rem;

  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;
