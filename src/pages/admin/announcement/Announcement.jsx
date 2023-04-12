import React from 'react';

import { Title, Container, Subject, Message, Button } from './styled';

import useInput from '../../../hooks/useInput';
import { createAnnouncement } from '../../../services/request';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';

function Announcement() {
  const [subject, subjectHandler, resetSubject] = useInput('');
  const [message, messageHandler, resetMessage] = useInput('');

  const sendAnnouncement = async (e) => {
    e.preventDefault();

    const { data } = await createAnnouncement(subject, message);

    console.log(data);

    if (data.error == '') {
      showSuccessToast('Announcement was sent');
      resetSubject();
      resetMessage();
    } else {
      showErrorToast('Something went wrong, Try Again!');
    }
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
