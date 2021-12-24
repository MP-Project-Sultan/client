import React from 'react';
import Home from './components/Home'
import Register from './components/Register';


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
        
            web Home Page
         
       <Home/>
       <Register/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
