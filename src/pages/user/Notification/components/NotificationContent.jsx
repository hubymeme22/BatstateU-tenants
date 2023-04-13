import React, { useState, useEffect } from 'react';

import { Container } from '../Styled';

import FromTo from './FromTo';
import MainForm from './MainForm';
import NothingtoShow from './NothingtoShow';

import { getStudentAnnouncements } from '../../../../services/request';

function NotificationContent() {
  const [notif, setNotif] = useState({ subject: '', message: '' });
  ('Hello this is a sample test, very very long message');

  // useEffect(() => {
  //   const getData = async () => {
  //     const fetchedData = await getStudentAnnouncements();
  //     localStorage.setItem('announcement', fetchedData.data.message);
  //   };
  //   getData();
  // }, []);

  const fetchedAnn = sessionStorage.getItem('announcement');
  return (
    <>
      {!fetchedAnn ? (
        <NothingtoShow />
      ) : (
        <Container>
          <FromTo subj={notif.subject} />
          <MainForm content={notif.message} />
        </Container>
      )}
    </>
  );
}

export default NotificationContent;
