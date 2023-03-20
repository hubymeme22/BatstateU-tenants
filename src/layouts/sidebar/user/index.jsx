import React from 'react';

import { StyledSidebar, Title, LineBreak } from '../styled';
import { Nav, NavLink, Button } from '../styled';

import { BsEnvelopePaperFill } from 'react-icons/bs';
import { IoNotificationsSharp } from 'react-icons/io5';
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

      <Button onClick={auth.logout}> Logout </Button>
    </StyledSidebar>
  );
}
