import React, { useState } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Button,
  Input,
} from '@chakra-ui/react';
const NotFound = () => {
  return (
    <Box h="60vh" bg="rgba(242, 242, 242, 1)">
      <Text fontSize="5rem">Oops there wrong direction</Text>
    </Box>
  );
};

export default NotFound;
