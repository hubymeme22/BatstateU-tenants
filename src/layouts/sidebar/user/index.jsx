import React from 'react';
import styled from 'styled-components';
// Styled-components

import { Title, LineBreak } from '../styled';
import { Nav, NavLink, Button } from '../styled';
import { useContext } from 'react';
// Icons
import { FaUsers } from 'react-icons/fa';
import { BsEnvelopePaperFill } from 'react-icons/bs';
import { IoNotificationsSharp } from 'react-icons/io5';
import { FaExclamation } from 'react-icons/fa';
// Hooks
import { useAuth } from '../../../hooks/useAuth';
import axios from 'axios';

export function Sidebar() {
  const [notif, setNotif] = React.useState({ subject: '', message: '' });
  React.useEffect(() => {
    const getData = async () => {
      const fetchedData = await axios.get(
        'http://localhost:5050/api/student/announcement'
      );
      setNotif(fetchedData.data);
    };
    getData();
  }, []);
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
            {notif.subject || notif.message === '' ? null : <Exclamation />}
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
  @media screen and (max-width: 767px) {
    padding: 30px 10px 40px 10px;
  }
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
    @media screen and (max-width: 767px) {
      width: 200px;
    }
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
  }
`;

const Exclamation = styled(FaExclamation)`
  width: 9px;
  height: 10px;
  color: red;
  margin: -11.5px;
`;
