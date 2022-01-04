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
    <Box h='100vh'>
      <ChakraProvider theme={theme}>
        <VStack>
          {' '}
          <Box color="white" h="200px" m="6" pb="300" w="280px">
            <VStack>
              <>
                {!loggedIn ? (
                  <>
                    <br />
                    <VStack w="80%">
                      {' '}
                      <Box
                        w="270%"
                        mt="20px"
                        bg="rgb(48,47,47)"
                        h="70vh"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                      >
                        <Button
                          w="200px"
                          mt="5"
                          m="3"
                          color="rgba(26, 24, 24, 0.671)"
                          onClick={() => connectRoom(1)}
                        >
                          Javascript Room
                        </Button>
                        <Button
                          color="rgba(26, 24, 24, 0.671)"
                          mt="5"
                          m="3"
                          w="200px"
                          onClick={() => connectRoom(2)}
                        >
                          Python Room
                        </Button>
                        <Button
                          color="rgba(26, 24, 24, 0.671)"
                          mt="5"
                          m="3"
                          w="200px"
                          onClick={() => connectRoom(3)}
                        >
                          Swift Room
                        </Button>
                      </Box>
                    </VStack>
                  </>
                ) : (
                  <>
                    <Box
                      display="flex"
                      position="sticky"
                      justifyContent="space-between"
                      flexDirection="column"
                      alignItems="center"
                      border="black solid 1px"
                      p="2"
                    >
                      <Text color="Gray">Java Script</Text>
                      <Box top="" mb="40">
                        {messagesList.map(msg => (
                          <VStack>
                            <Text color="black">
                              {' '}
                              {msg.userName}: {msg.content}
                            </Text>
                            {/* <Text color="black"> {msg.content}</Text> */}
                          </VStack>
                        ))}
                      </Box>

                      <HStack>
                        <Input
                          w="200"
                          color="black"
                          m="4"
                          type="text"
                          placeholder="write your message here..."
                          onChange={e => setMessage(e.target.value)}
                        />
                        <Button
                          color="black"
                          bg="gold"
                          onClick={() => {
                            send();
                          }}
                        >
                          Send
                        </Button>
                      </HStack>
                    </Box>
                  </>
                )}
              </>
            </VStack>
          </Box>
        </VStack>
      </ChakraProvider>
    </Box>
  );
}

export default Message;
