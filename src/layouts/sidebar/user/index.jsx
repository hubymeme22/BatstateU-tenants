import React from 'react';
import styled from 'styled-components';
// Styled-components
import { Title, LineBreak } from '../styled';
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
    <StyledSidebar id='userSidebar'>
      <div>
        <Title>WELCOME SPARTAN</Title>
        <LineBreak />

        <Nav>
          <NavLink to='/' end>
            <BsEnvelopePaperFill />
            Form
          </NavLink>

          <NavLink to='/notification'>
            <IoNotificationsSharp />
            Notification
          </NavLink>
        </Nav>
      </div>

      <div>
        <NavLink to='/account'>
          <FaUsers />
          Account
        </NavLink>
        <Button onClick={() => auth.logout('/login')}> Logout </Button>
      </div>
    </StyledSidebar>
  );
}
const StyledSidebar = styled.aside`
  color: white;
  width: min(100%, 350px);
  background-color: ${({ theme }) => theme.primary};
  border-radius: 10px;

  padding: 2rem 0 4rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
  }
`;
