/* eslint-disable no-unused-vars */

import { useEffect } from "react";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:3000/";
var socket;
const Message = () => {
  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);
  return <div>Message</div>;
};

export default Message;
