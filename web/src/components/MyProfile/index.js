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
  
  return (
    <ChakraProvider theme={theme}>
      <Box bg="rgba(114, 117, 119, 0.548)" h="100%" w="100%">
        <div>
          {user.length &&
            user.map(e => (
              <VStack>
                <Box mt="100" mb="250" border="solid gray 2px" w="60" h="100">
                  {' '}
                  <>
                    <Image
                      display="inline"
                      w="5"
                      borderRadius="full"
                      src="https://th.bing.com/th/id/R.0e0adfcf50b345161a6a5b47bb8b5f07?rik=cPwI89xNfVXFeQ&riu=http%3a%2f%2fwww.hexatar.com%2fgallery%2fpng%2f190418_124617_m2230fe8f39_avatar.png&ehk=RZX%2bKqAnJJ0UsHx9nSjX7%2b6AduRMrKDy90w7JqaxOlE%3d&risl=&pid=ImgRaw&r=0"
                    />
                    <></>
                    <Text>{e.username}</Text>
                    <Text>{e.email}</Text>
                  </>
                </Box>
              </VStack>
            ))}
        </div>
      </Box>
    </ChakraProvider>
  );
};

export default MyProfile;
