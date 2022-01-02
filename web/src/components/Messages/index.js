import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

let socket;
let CONNECTION_PORT = 'http://localhost:5000';

function Message() {
  const [room, setRoom] = useState(0);
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on('recieve_message', data => {
      setMessagesList([...messagesList, data]);
    });
  }, [messagesList]);

  const send = () => {
    const messageContent = {
      userName: state.Login.user.username,
      content: message,
      room,
    };
    console.log(messageContent, 'messageContent');
    socket.emit('send_message', messageContent);
    setMessagesList([...messagesList, messageContent]);
    setMessage('');
  };

  const connectRoom = room => {
    console.log(state.Login);
    setRoom(room);
    if (state.Login.user.username && room) {
      socket.emit('join_room', { userName: state.Login.user.username, room });
      setLoggedIn(true);
    }
  };

  return (
    <>
      {!loggedIn ? (
        <>
          <br />
          {console.log(state.Login.user.data)}
          <button onClick={() => connectRoom(1)}>room 1</button>
          <button onClick={() => connectRoom(2)}>room 2</button>
          <button onClick={() => connectRoom(3)}>room 3</button>
        </>
      ) : (
        <>
          {messagesList.map(msg => (
            <p>
              {msg.userName} {msg.content}
            </p>
          ))}

          <input
            type="text"
            placeholder="write your message here..."
            // value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button
            onClick={() => {
              send();
            }}
          >
            Send
          </button>
        </>
      )}
    </>
  );
}

export default Message;
