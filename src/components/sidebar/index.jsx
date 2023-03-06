import React from 'react';
import { useNavigate } from 'react-router-dom';

import { StyledSidebar, Title, LineBreak } from './styled';
import { Nav, NavLink, Button } from './styled';

import { MdDashboard } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';

function Sidebar() {
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate('/admin/login');
  };

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

      <Button onClick={logoutUser}> Logout </Button>
    </StyledSidebar>
  );
}

export default Sidebar;
