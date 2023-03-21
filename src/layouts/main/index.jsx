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

  useEffect(() => {
    if (!token || token == null) {
      navigate('/admin/login', { replace: true });
    }
  }, []);

  return (
    <MainContainer>
      {type == 'admin' ? <AdminSidebar /> : <UserSidebar />}
      <Content>
        <Outlet />
      </Content>
    </MainContainer>
  );
}

export default Main;
