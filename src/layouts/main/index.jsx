import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { MainContainer, Content } from './styled';

// Sidebars
import { Sidebar as AdminSidebar } from '../sidebar/admin';
import { Sidebar as UserSidebar } from '../sidebar/user';

import { checkToken } from '@/utils/tokenHandler';
import { validateToken, clearToken } from '../../utils/tokenHandler';

function Main({ type }) {
  const [tokenIsValid, setTokenIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkCredentials = async () => {
      const token = await checkToken();

      // Check if the token is null, redirect to respective login page
      if (!token) {
        clearToken();
        if (type == 'admin') return navigate('/admin/login');
        return navigate('/login');
      }

      // Checks token, if token is not valid, clear token and redirect
      let credentials = await validateToken(token, type);
      if (!credentials.valid) {
        clearToken();

        if (type == 'admin') return navigate('/admin/login');
        return navigate('/login');
      } else {
        setTokenIsValid(true);
      }
    };

    checkCredentials();
  }, []);

  return (
    <MainContainer>
      {type == 'admin' ? <AdminSidebar /> : <UserSidebar />}
      <Content>
        {tokenIsValid ? <Outlet /> : null}
        {/*  */}
      </Content>
    </MainContainer>
  );
}

export default Main;
