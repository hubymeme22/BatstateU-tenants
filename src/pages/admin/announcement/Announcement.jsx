import React from 'react';

import { Title, Container, Subject, Message, Button } from './styled';

import useInput from '../../../hooks/useInput';

function Announcement() {
  const [subject, subjectHandler, resetSubject] = useInput('');
  const [message, messageHandler, resetMessage] = useInput('');

  const sendAnnouncement = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Title>Announcement</Title>

      <Container onSubmit={(e) => sendAnnouncement(e)}>
        <Subject placeholder="Subject" {...subjectHandler} required />

        <Message placeholder="Message" {...messageHandler} required></Message>

        <Button color=""> Send </Button>
      </Container>
    </div>
  );
}

export default Announcement;
