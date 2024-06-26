import React from 'react';

import { StyledSidebar, Title, LineBreak } from '../styled';
import { Nav, NavLink, Button } from '../styled';

import { useAuth } from '@/hooks/useAuth';

import { MdDashboard } from 'react-icons/md';
import { FaUsers, FaHouseUser, FaBell } from 'react-icons/fa';
import { BsHouseGearFill } from 'react-icons/bs';

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
            <FaHouseUser />
            Tenants
          </NavLink>

          <NavLink to="/admin/users">
            <FaUsers />
            Users
          </NavLink>

          <NavLink to="/admin/announcement">
            <FaBell />
            Announcement
          </NavLink>

          <NavLink to="/admin/settings">
            <BsHouseGearFill />
            Settings
          </NavLink>
        </Nav>
      </div>

      <Button onClick={() => auth.logout('/admin/login')}> Logout </Button>
    </StyledSidebar>
  );
}
