import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

const News = () => {
  const [text, setText] = useState([]);
  const [news, SetNews] = useState([]);
  useEffect(() => {
    const result = async () => {
      try {
        const data = await axios.get(
          `https://hn.algolia.com/api/v1/search?query=foo&tags=story`
        );
        SetNews(data.hits);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    result();
  }, []);

  return (
    <Box>
      {news.map(e => {
        <VStack>
          <Text fontSize="4rem"> {e.author}</Text>
          <Input width="40%"></Input>{' '}
          <HStack>
            <Button>Search</Button>
            <Button>Search</Button>
          </HStack>
          <Text> </Text>
        </VStack>;
      })}{' '}
    </Box>
  );
};

export default News;
