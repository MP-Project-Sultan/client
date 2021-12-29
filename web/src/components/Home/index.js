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
          `https://newsapi.org/v2/everything?q=${text}&from=2021-11-29&language=en&sortBy=publishedAt&apiKey=2c1b0c0e925f4f78b02d429bf6cf5cdf`
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
    <Box>
      <VStack>
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
        <SimpleGrid mt='20'  columns={2} spacing={2}>
          {news.map(e => (
            <VStack>
              {' '}
              <Box
              mt='10'
                position="relative"
                color="black"
                background="#E2E8F0"
                width="50%"
                height="550px"
                borderRadius="3"
                border=" 2px solid #0BC5EA"
                column="2"
                mb='10'
              >
                <Image w="100%" height="300" src={e.urlToImage} />
                <Text>{e.title}</Text>
                <Text mt="5" fontSize="12px">
                  {e.content}
                </Text>

                <br />
                <Link
                  position="absolute"
                  color="rgb(57, 123, 245)"
                  bottom="0"
                  href={e.url}
                  fontSize="15px"
                  marginLeft='110'
                  
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
