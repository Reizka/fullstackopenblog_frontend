import React from "react";
const Notification = ({ message }) => {
  if (message) {
    console.log("sending a message: ", message);
    return <div>{message}</div>;
  } else {
    return <></>;
  }
};

export default Notification;
