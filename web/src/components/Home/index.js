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
  const [text, setText] = useState([]);
  const [news, SetNews] = useState([]);

  useEffect(() => {
    result();
  }, []);
  const result = async () => {
    try {
      const data = await axios
        .get(
          `https://newsapi.org/v2/everything?q=javascript&language=en&from=2021-11-27&sortBy=publishedAt&apiKey=941e34ca80a2416498f8b4c2b895c22d`
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
        <Text fontSize="4rem">Programmer News</Text>
        <SimpleGrid padding="3rem" columns={3} spacing={10}>
          {news.map(e => (
            <HStack>
              {' '}
              <Box
                position="relative"
                color="black"
                background="#E2E8F0"
                width="250px"
                height="500px"
                borderRadius="3"
                border=" 2px solid #0BC5EA"
                column="2"
              >
                <Image src={e.urlToImage} />
                <Text>{e.title}</Text>
                <Text pt="100px" fontSize="15px">
                  Author: {e.author}
                </Text>
                <br />
                <br />
                <Link
                  position="absolute"
                  bottom="0"
                  right="15Vh"
                  href={e.url}
                  fontSize="15px"
                >
                  Read More
                  {console.log(e.urlToImage)}
                </Link>
              </Box>
            </HStack>
          ))}{' '}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default News;
