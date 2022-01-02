import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const MyProfile = () => {
  const [user, setUser] = useState('');
  const [username , setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
      const BASE_URL = process.env.REACT_APP_BASE_URL;



  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  useEffect(() => {
    result();
  }, []);
  const result = async () => {
    await axios
      .get(`http://localhost:5000/getUserById/${state.Login.user._id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setUser(result.data);
        console.log(result.data);
      });

  };
  const updateUser = async () => {
    await axios.put(
      `${BASE_URL}/updateUser/${state.Login.user._id}`,
      {
        username: username,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    
    result();
  };

  
  return (
    <ChakraProvider theme={theme}>
      <VStack>
        {' '}
        <Box bg="rgba(252, 252, 252, 0.815)" h="60%" w="60%">
          {user.length &&
            user.map(e => (
              <Box mt="100" mb="250" border="solid gray 2px" w="100" h="300">
                {' '}
                <VStack>
                  {' '}
                  <Image
                    w="5"
                    mt="4"
                    borderRadius="full"
                    src="https://th.bing.com/th/id/R.0e0adfcf50b345161a6a5b47bb8b5f07?rik=cPwI89xNfVXFeQ&riu=http%3a%2f%2fwww.hexatar.com%2fgallery%2fpng%2f190418_124617_m2230fe8f39_avatar.png&ehk=RZX%2bKqAnJJ0UsHx9nSjX7%2b6AduRMrKDy90w7JqaxOlE%3d&risl=&pid=ImgRaw&r=0"
                  />
                  <Text>{e.username}</Text>
                  <Text>{e.email}</Text>
                  <Input
                    w="100"
                    textAlign="center"
                    mt="5"
                    onChange={e => {
                      setUsername(e.target.value);
                    }}
                    placeholder="username"
                  />
                  <br />
                  <Input
                    mt="6"
                    w="100"
                    textAlign="center"
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Email"
                  />
                  <br />
                  <Button mt="4" onClick={() => updateUser()}>
                    update
                  </Button>{' '}
                </VStack>{' '}
              </Box>
            ))}
        </Box>
      </VStack>
    </ChakraProvider>
  );
};

export default MyProfile;
