import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const Register = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [email , setEmail] = useState('')
    const [ username , setUsername] = useState('')
    const [password , setPassword]= useState('')
    const signup = async () =>{
        const result = await axios.post(`http://localhost:5000/register` , {
            email : email,
            username : username,
            password : password
        })
        console.log(BASE_URL);
    }


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
          <h1>Register</h1>
          <Input onChange={e =>{setUsername(e.target.value)}} mt="10px" mb="10px" placeholder="Name" textAlign="Center" />
          <Input
          onChange={e =>{setEmail(e.target.value)}}
            mb="10px"
            placeholder="Email"
            textAlign="Center"
            type="email"
          />
          <Input
          onChange={e =>{setPassword(e.target.value)}}
            mb="10px"
         placeholder="Password"
            type="password"
            textAlign="Center"
          />
          <Button onClick={signup}>LOGIN</Button>
        </Box>
      </ChakraProvider>
    );
}

export default Register
