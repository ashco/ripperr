import React from 'react';
import styled from 'styled-components';

import useNotification from 'hooks/useNotification';

const NotificationBanner: React.FC = () => {
  const notification = useNotification()[0];
  console.log(notification);

  return (
    <StyledNotificationBanner active={notification.active}>
      <p>{notification.message}</p>
    </StyledNotificationBanner>
  );
};

const StyledNotificationBanner = styled.div<{ active: boolean }>`
  width: 100%;
  background: red;
  z-index: 100;
  grid-area: navigation;
  display: ${(props) => (props.active ? 'auto' : 'none')};
`;

export default NotificationBanner;
