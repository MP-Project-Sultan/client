import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { sign } from '../../Reducer/login';
import { getpost, addpost, delpost } from '../../Reducer/post';

import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Icon,
} from '@chakra-ui/react';

const Posts = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState();
  const [like, setLike] = useState();
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  useEffect(() => {
    result();
  }, []);
  const result = async () => {
    const data = await axios
      .get(`http://localhost:5000/getPosts`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setPost(result.data);
        // console.log(result.data);
      });
  };
  // const delpost = async id => {
  //   try {
  //     const res = await axios.delete(`${BASE_URL}/deletePost/${id}`, {
  //       headers: { authorization: `Bearer ${state.Login.token}` },
  //       result()
  //     });
  //   } catch (error) {console.log(error);}
  // };

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <VStack>
          <Box w="500px" mt="1%" border="solid 2px gray" padding="20px">
            {post.map(e => (
              <>
                <Text>Post: {e.description}</Text>{' '}
                <Text>From: {e.userId.username}</Text>
                {e.commentId.map(s => (
                  <Box h="100px" mt="4" border="solid 1px gray" padding="20px">
                    <Text fontSize="10px" color="gold">
                      Comment :{s.description}
                    </Text>
                  </Box>
                ))}
              </>
            ))}
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Posts;
