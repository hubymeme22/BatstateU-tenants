import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { MainContainer, Content } from './styled';

// Sidebars
import { Sidebar as AdminSidebar } from '../sidebar/admin';
import { Sidebar as UserSidebar } from '../sidebar/user';

import { getTokenCookie, clearToken } from '../../utils/tokenHandler';
import { validateToken } from '../../services/request';

import useToggle from '../../hooks/useToggle';

function Main({ type }) {
  const [tokenIsValid, toggleTokenIsValid] = useToggle(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkCredentials = async () => {
      const token = getTokenCookie();

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
        toggleTokenIsValid(true);
        toggleIsLoading();
      }
    };

    checkCredentials();
  }, []);

  return (
    <>
      {tokenIsValid && (
        <MainContainer>
          {type == 'admin' ? <AdminSidebar /> : <UserSidebar />}
          <Content>
            <Outlet />
          </Content>
        </MainContainer>
      )}
    </>
  );
}

export default Main;
