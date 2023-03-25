import React from 'react';

// Styled-components
import { StyledSidebar, Title, LineBreak } from '../styled';
import { Nav, NavLink, Button } from '../styled';

// Icons
import { FaUsers } from 'react-icons/fa';
import { BsEnvelopePaperFill } from 'react-icons/bs';
import { IoNotificationsSharp } from 'react-icons/io5';

// Hooks
import { useAuth } from '../../../hooks/useAuth';

export function Sidebar() {
  const auth = useAuth();

  return (
    <StyledSidebar>
      <div>
        <Title>WELCOME SPARTAN</Title>
        <LineBreak />

        <Nav>
          <NavLink to="/" end>
            <BsEnvelopePaperFill />
            Form
          </NavLink>

          <NavLink to="/notification">
            <IoNotificationsSharp />
            Notification
          </NavLink>
        </Nav>
      </div>

      <div>
        <NavLink to="/account">
          <FaUsers />
          Account
        </NavLink>
        <Button onClick={() => auth.logout('/login')}> Logout </Button>
      </div>
    </StyledSidebar>
  );
}
