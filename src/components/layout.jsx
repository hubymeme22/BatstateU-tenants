import React from 'react';
import styled from 'styled-components';
import Sidebar from './sidebar';

function Layout({ children }) {
  return (
    <StyledLayout>
      <Sidebar />
      <Content>{children}</Content>
    </StyledLayout>
  );
}

export default Layout;

const StyledLayout = styled.div`
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
