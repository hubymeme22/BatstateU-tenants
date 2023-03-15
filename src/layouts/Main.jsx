import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from '../components/sidebar';
import { checkToken } from '../utils/tokenHandler';

function Main() {
  const navigate = useNavigate();
  const token = checkToken();

  useEffect(() => {
    if (!token || token == null) {
      navigate('/admin/login', { replace: true });
    }
  }, []);

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
  background-color: ${({ theme }) => theme.darkGray};
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
