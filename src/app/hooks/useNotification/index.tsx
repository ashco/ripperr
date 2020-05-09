import React from 'react';

type Notification = {
  active: boolean;
  message: string;
};

function useNotification(): [Notification, (msg: string) => void] {
  const initialNotification: Notification = {
    active: false,
    message: '',
  };

  const [notification, setNotification] = React.useState<Notification>(
    initialNotification,
  );

  const setNotificationTimeout = (msg: string): void => {
    setNotification({
      active: true,
      message: msg,
    });

    setTimeout(() => {
      setNotification({
        active: false,
        message: '',
      });
    }, 5000);
  };

  return [notification, setNotificationTimeout];
}

export default useNotification;
