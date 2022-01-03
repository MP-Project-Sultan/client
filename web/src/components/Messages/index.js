import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Icon,
  Input,
  Button,
  Link,
  Image,
  HStack,
} from '@chakra-ui/react';
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
    <Box m="6" mb="371">
      <>
        {!loggedIn ? (
          <>
            <br />
            <Button m="3" onClick={() => connectRoom(1)}>
              Room of Community
            </Button>
            <Button m="3" onClick={() => connectRoom(2)}>
              room 2
            </Button>
            <Button m="3" onClick={() => connectRoom(3)}>
              room 3
            </Button>
          </>
        ) : (
          <>
            {messagesList.map(msg => (
              <VStack><Text>
              From :  {msg.userName} 
              </Text><Text>
               Message : {msg.content}
              </Text></VStack>
            ))}

            <Input
            w='200'
            m='4'
              type="text"
              placeholder="write your message here..."
              onChange={e => setMessage(e.target.value)}
            />
            <Button
              onClick={() => {
                send();
              }}
            >
              Send
            </Button>
          </>
        )}
      </>
    </Box>
  );
}

export default Message;
