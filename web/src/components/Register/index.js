import React from 'react'
import { Route ,Routes} from 'react-router-dom'
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
  Input
} from '@chakra-ui/react';

const index = () => {
    return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          web Register
          <Input placeholder="Name" textAlign="Center" />
          <Input placeholder="Email" textAlign="Center" type="email" />
          <Input placeholder="Password" type="password" textAlign="Center" />
          <Button />
        </Box>
      </ChakraProvider>
    );
}

export default index
