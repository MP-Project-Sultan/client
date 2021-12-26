import React ,{useState} from 'react';
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

const News = () => {
    const [text , setText] = useState([])
    const [news , SetNews] = useState('')
  return (
    <Box>
      <VStack>
        <Text fontSize="4rem"> News</Text>
        <Input width="40%"></Input> <HStack>
        <Button>Search</Button>
        <Button>Search</Button>
      </HStack>
      <Text> text</Text>
      </VStack>

     
    </Box>
  );
};

export default News;
