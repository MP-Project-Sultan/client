import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { DeleteIcon } from '@chakra-ui/icons';

import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  HStack,
  Link,
  Code,
} from '@chakra-ui/react';

const UserCP = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [user, setUser] = useState([]);
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
    const data = await axios
      .get(`${BASE_URL}/getUsers`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setUser(result.data);
      });
  };

  const del = async id => {
    try {
      const res = await axios.delete(`${BASE_URL}/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });

      result();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box bg="rgba(0, 0, 0, 0.87)">
        <Link color="white" href="/userCp">
          Users cpanel
        </Link>
        <br />
        <Link color="white" href="/postCp">
          Post cpanel
        </Link>{' '}
        <VStack>
          <Box
            bg="rgba(6, 6, 7, 0.226)"
            w="800px"
            mt="1%"
            border="solid 2px gray"
            padding="20px"
            borderRadius="4"
          >
            {' '}
            <Text color="white">Admin Control Panel</Text>
            {user.map(e => (
              <Box
                borderRadius="4"
                boxShadow="dark-lg"
                p="2"
                border="solid gray"
                m="2"
                key={e._id}
              >
                <Code fontSize="18px" fontFamily="mono">
                  username : {e.username}
                </Code>{' '}
                <Text fontSize="18px" fontFamily="mono" color="white">
                  {' '}
                  Email:
                  {e.email}
                </Text>{' '}
                <Text fontSize="18px" fontFamily="mono" color="white">
                  {' '}
                  password code:
                  {e.passwordCode}
                </Text>
                <Text fontSize="18px" fontFamily="mono" color="white">
                  {' '}
                  Is Deleted:
                  {e.isDel.toString()}
                </Text>
                <Text fontSize="18px" fontFamily="mono" color="white">
                  {' '}
                  Is Active:
                  {e.isActive.toString()}
                </Text>
                <HStack>
                  <DeleteIcon
                    color="white"
                    w="3"
                    cursor="pointer"
                    position="absolute"
                    left="971"
                    marginBottom="33"
                    onClick={() => {
                      del(e._id);
                    }}
                  >
                    delete
                  </DeleteIcon>{' '}
                </HStack>{' '}
              </Box>
            ))}
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default UserCP;
