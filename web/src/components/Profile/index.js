import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Image,
} from '@chakra-ui/react';

const User = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [user, setUser] = useState('');
  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  const { id } = useParams();
  useEffect(() => {
    result();
  }, []);
  const result = async () => {
    await axios
      .get(`${BASE_URL}/getUserById/${id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setUser(result.data);
        console.log(result.data);
      });

    console.log(id);
  };
  return (
    <Box bg="rgba(242, 242, 242, 1)">
      <ChakraProvider theme={theme}>
        <VStack>
          <Box w="50%">
            <div>
              {user.length &&
                user.map(e => (
                  <Box
                    mt="100"
                    boxShadow="dark-lg"
                    mb="250"
                    
                  >
                    {' '}
                    <>
                      <VStack m="10">
                        <Image
                          w="80px"
                          mt='6'
                          borderRadius="full"
                          src="https://th.bing.com/th/id/R.0e0adfcf50b345161a6a5b47bb8b5f07?rik=cPwI89xNfVXFeQ&riu=http%3a%2f%2fwww.hexatar.com%2fgallery%2fpng%2f190418_124617_m2230fe8f39_avatar.png&ehk=RZX%2bKqAnJJ0UsHx9nSjX7%2b6AduRMrKDy90w7JqaxOlE%3d&risl=&pid=ImgRaw&r=0"
                        />
                        <Text>{e.email}</Text>
                        <Text pb='4'>{e.username}</Text>
                      </VStack>{' '}
                    </>
                  </Box>
                ))}
            </div>
          </Box>
        </VStack>
      </ChakraProvider>
    </Box>
  );
};

export default User;
