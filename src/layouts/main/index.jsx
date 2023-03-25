import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { MainContainer, Content } from './styled';

// Sidebars
import { Sidebar as AdminSidebar } from '../sidebar/admin';
import { Sidebar as UserSidebar } from '../sidebar/user';

import { checkToken } from '@/utils/tokenHandler';

function Main({ type }) {
  const navigate = useNavigate();
  const token = checkToken();

  // Redirect to other pages if the token is not valid
  useEffect(() => {
    if (!token || token == null) {
      if (type === 'admin') {
        navigate('/admin/login', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }
  }, []);

  return (
    <MainContainer>
      {type == 'admin' ? <AdminSidebar /> : <UserSidebar />}
      <Content>
        {token ? <Outlet /> : null}
        {/*  */}
      </Content>
    </MainContainer>
  );
}

export default Main;
