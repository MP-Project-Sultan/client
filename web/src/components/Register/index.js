import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content';
import ReactCodeInput from 'react-verification-code-input';
import PasswordChecklist from 'react-password-checklist';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
  Input,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
const MySwal = withReactContent(Swal);

const Register = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const signup = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/register`, {
        email: email,
        username: username,
        password: password,
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Register successfuly',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/login')
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email Already Registed',
        confirmButtonColor: 'black',
      });
    }
  };

  return (
    <Box w="100%" h="100%" bg="rgba(114, 117, 119, 0.548)">
      <ChakraProvider theme={theme}>
        <VStack>
          <Box
            borderRadius="3px"
            border="solid black 1px"
            textAlign="center"
            w="400px"
            h="100%"
            mt="11"
            textAlign="center"
            bg="#fffb"
            color="black"
            mb='24'
          >
            <VStack>
              <Text mb="3" mt="3">
                Register
              </Text>
              <Input
                bg="#222"
                color="white"
                textAlign="center"
                type="name"
                w="200px"
                placeholder="enter Email"
                onChange={e => {
                  setUsername(e.target.value);
                }}
                mt="10px"
                mb="10px"
                placeholder="Name"
                textAlign="Center"
              />
              <Input
                bg="#222"
                w="200px"
                color="white"
                textAlign="center"
                type="email"
                width="40"
                placeholder="enter Email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
                mb="10px"
                placeholder="Email"
                textAlign="Center"
                type="email"
              />{' '}
              <Input
                bg="#222"
                id="resetPasswordButton"
                color="white"
                textAlign="center"
                w="200px"
                type="password"
                placeholder="Password"
                className="resetPassword"
                onChange={e => setPassword(e.target.value)}
              />
              <br />
              <Button bg="#777" onClick={signup}>
                Register
              </Button>
              <Box fontSize='12' mb="111">
                {' '}
                <PasswordChecklist
                  rules={[
                    'minLength',
                    'specialChar',
                    'number',
                    'capital',
                    'lowercase',
                  ]}
                  minLength={6}
                  value={password}
                  onChange={isValid => {
                    if (isValid) {
                      const button = document.querySelector(
                        '#resetPasswordButton'
                      );
                      button.disabled = false;
                    } else {
                      const button = document.querySelector(
                        '#resetPasswordButton'
                      );
                      button.disabled = false;
                    }
                  }}
                />
              </Box>
            </VStack>
          </Box>
        </VStack>
      </ChakraProvider>
    </Box>
  );
};

export default Register;
