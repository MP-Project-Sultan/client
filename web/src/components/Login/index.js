import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sign } from '../../Reducer/login';

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
  HStack,
  Input,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactCodeInput from 'react-verification-code-input';
const MySwal = withReactContent(Swal);

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [local, setLocal] = useState('');
  // const navigate = useNavigate();
  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    setLocal(token);
  }, []);
  const logIn = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
        username,
      });
      const data = {
        user: result.data.result,
        token: result.data.token,
      };
      console.log(data);
      dispatch(sign(data));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login success',
        showConfirmButton: false,
        timer: 1500,
      });
      
    } catch (error) {
       MySwal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'worng Email or password',
         confirmButtonColor: 'black',
       });
      
    }
    
  };
  return (
    <Box bg="rgba(114, 117, 119, 0.548)" w="100%" h="100%">
      <ChakraProvider theme={theme}>
        <VStack>
          {' '}
          <Box
            borderRadius="3px"
            border="solid black 1px"
            textAlign="center"
            w="300px"
            mt="100px"
            textAlign="center"
            mb="40"
            bg="#fffb"
            color="black"
          >
            <VStack mt="4">
              {!state.token ? (
                <div className="mainDiv">
                  <h1>Login</h1>
                  <VStack mt="4">
                    <Input
                      bg="#201f1e"
                      w="197px"
                      color="white"
                      textAlign="center"
                      type="email"
                      width="40"
                      placeholder="enter Email"
                      onChange={e => {
                        setEmail(e.target.value);
                      }}
                    />
                    <br />

                    <Input
                      bg="#201f1e"
                      color="white"
                      textAlign="center"
                      type="password"
                      width="40"
                      placeholder="enter Password"
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                    />

                    <br />
                    <Button bg="#777" onClick={logIn}>
                      Login
                    </Button>
                    <Link exact href="/reset">
                      Forget password
                    </Link>
                    <br />
                  </VStack>
                </div>
              ) : (
                <h3></h3>
              )}
            </VStack>
          </Box>
        </VStack>
      </ChakraProvider>
    </Box>
  );
};

export default Login;
