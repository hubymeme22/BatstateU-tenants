import React from 'react';
import { Container } from '../Styled';
import FromTo from './FromTo';
import MainForm from './MainForm';
import axios from 'axios';

function NotificationContent() {
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
  return (
    <Container>
      <FromTo subj={notif.subject} />
      <MainForm content={notif.message} />
    </Container>
  );
}

export default NotificationContent;
