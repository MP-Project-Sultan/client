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
    const result = await axios.post(`http://localhost:5000/login`, {
      email,
      password,
      username,
    });
    const data = {
        user : result.data.result,
        token : result.data.token
    }
    dispatch(sign(data))
  };
  return (
    <ChakraProvider theme={theme}>
      <Box
        borderRadius="3px"
        border="solid silver"
        textAlign="center"
        w="300px"
        mt="100px"
        textAlign="center"
        ml="500px"
      >
        <VStack mt="4">
          {!state.token ? (
            <div className="mainDiv">
              <h1>Login</h1>
              <VStack mt="4">
                <Input
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
                  textAlign="center"
                  type="password"
                  width="40"
                  placeholder="enter Password"
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />
                <br />
                <Button className="btnMain" onClick={logIn}>
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
    </ChakraProvider>
  );
};

export default Login;
