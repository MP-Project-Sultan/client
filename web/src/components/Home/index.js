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
        .get(`https://hn.algolia.com/api/v1/search?query=news`)
        .then(result => {
          SetNews(result.data.hits);
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
        <SimpleGrid padding="3rem" columns={2} spacing={10}>
          {news.map(e => (
            <HStack>
              {' '}
              <Box
                background="gold"
                width="250px"
                height="300px"
                borderRadius="3"
                border="solid orange"
                column="2"
              >
                <Text>{e.title}</Text>
                <Text pt="100px" fontSize="15px">
                  Author: {e.author}
                  {console.log(news)}
                </Text>
                <br/><br/>
              <Link position="end" href={e.url}  fontSize="15px">
                Read More
                {console.log(news)}
              </Link></Box>
              
              
            </HStack>
          ))}{' '}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default News;
