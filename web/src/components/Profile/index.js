import React, { useState, useEffect } from 'react';
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

const User = () => {
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
      .get(`http://localhost:5000/getUserById/${id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setUser(result.data);
        console.log(result.data);
      });

    console.log(id);
  };
  return (
    <Box>
      <div>
        {user.length &&
          user.map(e => (
            <VStack>
              <Box border="solid gray 2px" w="60" h="100">
                {' '}
                <>
                  <Image
                    display="inline"
                    w="5"
                    borderRadius="full"
                    align="center"
                    w="30"
                    h="30"
                    src={e.img}
                  /> <Text>{e.email}</Text>
                  <Text>{e.username}</Text>
                 
                </>
              </Box>
            </VStack>
          ))}
      </div>
    </Box>
  );
};

export default User;
