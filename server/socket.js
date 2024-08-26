// import { Socket } from "socket.io-client";
import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  console.log("in initsocket");
  return io("http://localhost:5000", options);
};
