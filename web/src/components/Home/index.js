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
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import axios from 'axios';

const News = () => {
  const [text, setText] = useState('');
  const [news, SetNews] = useState([]);

  useEffect(() => {
    result();
  }, [text]);
  const result = async () => {
    try {
      const data = await axios
        .get(
          `https://newsapi.org/v2/everything?q=${text}&from=2021-11-28&language=en&sortBy=publishedAt&apiKey=941e34ca80a2416498f8b4c2b895c22d`
        )
        .then(result => {
          SetNews(result.data.articles);
          // console.log(result.data.hits[0].author);
        });
      // console.log(news);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Box>
      <VStack>
        <Text mt='30' mb='12' color="rgb(100, 107, 119)" fontSize="3rem">
          Programmer News
        </Text>
        <Input
          placeholder='Search News'
          textAlign="center"
          value={text}
          onChange={e => setText(e.target.value)}
          w="190"
        ></Input>
        <SimpleGrid  columns={2} spacing={4}>
          {news.map(e => (
            <VStack>
              {' '}
              <Box
                position="relative"
                color="black"
                background="#E2E8F0"
                width="60%"
                height="550px"
                borderRadius="3"
                border=" 2px solid #0BC5EA"
                column="2"
              >
                <Image w="100%" height="300" src={e.urlToImage} />
                <Text>{e.title}</Text>
                <Text mt='10' fontSize="12px">
                 {e.content}
                </Text>
                
               
                <br />
                <Link
                  position="center"
                  color="rgb(57, 123, 245)"
                  bottom="0"
                  right="15Vh"
                  href={e.url}
                  fontSize="15px"
                >
                  Read More
                  {console.log(e.urlToImage)}
                </Link>
              </Box>
            </VStack>
          ))}{' '}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default News;
