import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;
let CONNECTION_PORT = "http://localhost:5000";

function Message() {
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessagesList([...messagesList, data]);
    });
  }, [messagesList]);

  const send = () => {
    const messageContent = { userName, content: message, room };

    socket.emit("send_message", messageContent);
    setMessagesList([...messagesList, messageContent]);
    setMessage(" ");
  };

  const connectRoom = () => {
    if (userName && room) {
      socket.emit("join_room", { userName, room });
      setLoggedIn(true);
      setRoom("");
    }
  };

  return (
    <>
      {!loggedIn ? (
        <>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="enter your name..."
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            name="roomNumber"
            id="roomNumber"
            placeholder="enter your room number..."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={connectRoom}>Enter The Room</button>
        </>
      ) : (
        <>
          {messagesList.map((msg) => (
            <p>
              {msg.userName} {msg.content}
            </p>
          ))}

          <input
            type="text"
            placeholder="write your message here..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={send}>Send</button>
        </>
      )}
    </>
  );
}

export default Message;
