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
result()
},[])
  const result = async () => {
    const data = await axios.get(`http://localhost:5000/getPosts`, {
      headers: { authorization: `Bearer ${state.Login.token}` },
    })
    .then((result)=>{

         setPost(result.data);
         console.log(result.data);
    })
   
   
  };
 

  return (


    <ChakraProvider theme={theme}>
      <Box> 
          {post.map((e)=>  {
        <VStack>
          <Box w="500px" h="200px" mt="20%" border="solid 2px gray">
            <Text>{e}</Text>
            <Text>Comments </Text>
            <Text>Posts11</Text>
          </Box>
        </VStack>})}
      </Box>
    </ChakraProvider>
  );
};

export default Posts;
