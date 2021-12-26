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
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactCodeInput from 'react-verification-code-input';
const MySwal = withReactContent(Swal);

const Register = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [email , setEmail] = useState('')
    const [ username , setUsername] = useState('')
    const [password , setPassword]= useState('')
    const signup = async () =>{
      try {
        const result = await axios.post(`http://localhost:5000/register` , {
            email : email,
            username : username,
            password : password
        })
        Swal.fire({
          position: 'Register successfuly',
          icon: 'success',
          title: 'Login success',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
         MySwal.fire({
           icon: 'error',
           title: 'Oops...',
           text: 'Email Already Registed',
           confirmButtonColor: 'black',
         });
        
      }
        
        
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
          bg="#fffb"
          color="black"
        >
          <h1>Register</h1>
          <Input
            bg="#222"
            color="white"
            textAlign="center"
            type="name"
            width="40"
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
          />
          <Input
            bg="#222"
            color="white"
            textAlign="center"
            type="email"
            width="40"
            placeholder="enter Email"
            onChange={e => {
              setPassword(e.target.value);
            }}
            mb="10px"
            placeholder="Password"
            type="password"
            textAlign="Center"
          />
          <br />
          
          <Button bg="#777" onClick={signup}>LOGIN</Button>
        </Box>
      </ChakraProvider>
    );
}

export default Register
