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
  const [text, setText] = useState(' ');
  const [news, SetNews] = useState([]);

  useEffect(() => {
    result();
  }, [text]);
  const result = async () => {
    try {
      const data = await axios
        .get(
          `https://newsapi.org/v2/everything?q=${text}&from=2022-01-01&language=en&pageSize=100&sortBy=publishedAt&apiKey=941e34ca80a2416498f8b4c2b895c22d`
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
    <Box  p="5" bg="rgba(252, 252, 252, 0.815)">
      <Text mb="12" color="rgb(100, 107, 119)" fontSize="3rem">
        Programmer News
      </Text>
      <Input
        placeholder="Search News"
        textAlign="center"
        value={text}
        onChange={e => setText(e.target.value)}
        w="190"
      ></Input>
      <HStack>
        {' '}
        <SimpleGrid m="30" columns={1} spacing={3}>
          {news.map(e => (
            <Box
              position="relative"
              color="black"
              background="#E2E8F0"
              width="100%"
              height="100%"
              borderRadius="3"
              shadow="md"
              bg="rgba(252, 252, 252, 0.815)"
            >
              <HStack>
                {' '}
                <Image w="30%" height="50%" src={e.urlToImage} />
                <VStack>
                  {' '}
                  <Text>{e.title}</Text>
                  <Text mt="5" fontSize="12px">
                    {e.content}
                  </Text>
                </VStack>
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
                </Link>
              </HStack>
            </Box>
          ))}{' '}
        </SimpleGrid>{' '}
      </HStack>
    </Box>
  );
};

export default News;
