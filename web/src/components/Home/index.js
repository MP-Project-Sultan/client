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
import Navbar from '../Navbar';

const News = () => {
  const [text, setText] = useState('JAVA');
  const [news, SetNews] = useState([]);

  useEffect(() => {
    result();
  }, [text]);
  const result = async () => {
    try {
      const data = await axios
        .get(
          `https://newsapi.org/v2/everything?q=${text}&from=2022-01-01&language=en&sortBy=publishedAt&apiKey=941e34ca80a2416498f8b4c2b895c22d`
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
    <Box bg="rgba(252, 252, 252, 0.815)" p="5">
      <VStack>
        <Text mt="30" mb="12" color="rgb(48,47,47)" fontSize="3rem">
          Programmer News
        </Text>
        <Input
          placeholder="Search News"
          textAlign="center"
          value={text}
          cursor='default'
          color='white'
          bg="rgb(48,47,47)"
          onChange={e => setText(e.target.value)}
          w="190"
        ></Input>
        <SimpleGrid mt="20" columns={2} spacing={0}>
          {news.map(e => (
            <VStack>
              {' '}
              <Box
                mt="10"
                position="relative"
                color="black"
                background="rgba(201, 201, 201, 0.471)"
                width="70%"
                height="500px"
                borderRadius="3"
                mb="10"
                overflow="hidden"
              >
                <Image w="100%" height="300" src={e.urlToImage} />
                <Text p="3">{e.title}</Text>
                <Text mt="5" fontSize="12px" p="3">
                  {e.content}
                </Text>

                <br />
                <Link
                  position="absolute"
                  color="rgb(57, 123, 245)"
                  target="blank"
                  bottom="0"
                  href={e.url}
                  fontSize="15px"
                  marginLeft="170"
                >
                  More
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
