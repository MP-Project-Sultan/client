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
  const [text, setText] = useState('javascript');
  const [news, SetNews] = useState([]);

  useEffect(() => {
    result();
  }, [text]);
  const result = async () => {
    try {
      const data = await axios
        .get(
          `https://newsapi.org/v2/everything?q=${text}&from=2021-11-30&language=en&pageSize=100&sortBy=publishedAt&apiKey=941e34ca80a2416498f8b4c2b895c22d`
          // `https://newsdata.io/api/1/news?apikey=pub_316749a1f9e311947558934e30ad0011951a&q=${text}`
        )
        .then(result => {
          SetNews(result.data.articles);
          // SetNews(result.data.results);

          // console.log(result.data.hits[0].author);
        });
      // console.log(news);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Box bg="rgba(114, 117, 119, 0.548)">
      
        <Text mt="30" mb="12" color="rgb(100, 107, 119)" fontSize="3rem">
          Programmer News
        </Text>
        <Input
          placeholder="Search News"
          textAlign="center"
          value={text}
          onChange={e => setText(e.target.value)}
          w="190"
        ></Input>
        <HStack> <SimpleGrid mt="20" columns={1} spacing={0}>
          {news.map(e => (
            
          
              <Box
                mt="10"
                position="relative"
                color="black"
                background="#E2E8F0"
                width="50%"
                height="70%"
                borderRadius="3"
                border=" 2px solid black"
                mb="10"
              >
               <HStack> <Image w="40%"  h="10%" src={e.urlToImage} />
               <VStack> <Text>{e.title}</Text>
                <Text mt="5" fontSize="12px">
                  {e.content}
                </Text></VStack>

                <br />
                <Link
                  position="absolute"
                  color="rgb(57, 123, 245)"
                  bottom="0"
                  href={e.url}
                  fontSize="15px"
                  marginLeft="170"
                >
                  More
                  {console.log(e.urlToImage)}
                </Link></HStack>
              </Box>
            
          ))}{' '}
        </SimpleGrid> </HStack>
      
    </Box>
  );
};

export default News;