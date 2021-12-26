import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactCodeInput from 'react-verification-code-input';
import PasswordChecklist from 'react-password-checklist';
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
  HStack,
  Input,
} from '@chakra-ui/react';

const MySwal = withReactContent(Swal);
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Reset2 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [code, setCode] = useState(' ');
  const [password, setPassword] = useState(' ');
  const resetPassword = async () => {
    if (code.length > 0) {
      try {
        await axios.post(`http://localhost:5000/reset`, {
          id,
          code,
          password,
        });
        navigate('/login');
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!, please try again.',
          confirmButtonColor: 'black',
        });
      }
    }
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
          <h1>Reset Your Password</h1>
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
                const button = document.querySelector('#resetPasswordButton');
                button.disabled = false;
              } else {
                const button = document.querySelector('#resetPasswordButton');
                button.disabled = true;
              }
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            className="resetPassword"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <ReactCodeInput fields={4} onComplete={val => setCode(val)} />
          <Button id="resetPasswordButton" onClick={resetPassword}>
            Reset
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};
export default Reset2;
