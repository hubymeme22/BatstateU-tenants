import React from 'react';

import { StyledSidebar, Title, LineBreak } from '../styled';
import { Nav, NavLink, Button } from '../styled';

import { MdDashboard } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';

import { useAuth } from '@/hooks/useAuth';

export function Sidebar() {
  const auth = useAuth();

  return (
    <StyledSidebar>
      <div>
        <Title>RESOURCE GENERATION OFFICE</Title>
        <LineBreak />
        <Nav>
          <NavLink to="/admin" end>
            <MdDashboard />
            Dashboard
          </NavLink>

          <NavLink to="/admin/tenants">
            <FaUsers />
            Tenants
          </NavLink>

          <NavLink to="/admin/users">
            <FaUsers />
            Users
          </NavLink>
        </Nav>
      </div>

      <Button onClick={() => auth.logout('/admin/login')}> Logout </Button>
    </StyledSidebar>
  );
}
