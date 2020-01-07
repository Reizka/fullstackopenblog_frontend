import React from 'react';
const Notification = ({ message }) => {
  if (message) {
    return <div>{message}</div>;
  } else {
    return <></>;
  }
};

export default Notification;
