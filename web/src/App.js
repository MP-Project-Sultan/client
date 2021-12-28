import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Reset from './components/reset';
import Reset2 from './components/reset2';
import Active from './components/Active';
import Posts from './components/Posts';

import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/posts" element={<Posts />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/active/:id" element={<Active />} />
            <Route exact path="/reset2/:id" element={<Reset2 />} />
          </Routes>
        </>
      </Box>
    </ChakraProvider>
  );
}

export default App;
