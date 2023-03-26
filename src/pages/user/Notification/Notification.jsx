import React from 'react';
import NotificationContent from './components/NotificationContent';
import { NotifContainer } from './Styled';
function Notification() {
  return (
    <NotifContainer>
      <NotificationContent />
    </NotifContainer>
  );
}

export default Notification;
