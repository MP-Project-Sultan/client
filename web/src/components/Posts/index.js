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
  Input,
  Button,
  Link
} from '@chakra-ui/react';

const Posts = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState();
  const [like, setLike] = useState();
  const [newPost, setNewPost] = useState('')
  const dispatch = useDispatch();
  const [newcomment, setNewComment] = useState('');
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
  const addpost = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addPost`,
        {
          description: newPost,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );

      result();
    } catch (error) {
      console.log(error);
    }
  };
   const addcomment = async postId => {
     try {
       const res = await axios.post(
         `${BASE_URL}/addComment`,
         {
           description: newcomment,
           postId: postId,
         },
         {
           headers: {
             Authorization: `Bearer ${state.Login.token}`,
           },
         }
       );

       result();
     } catch (error) {
       console.log(error);
     }
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
            <VStack>
              {' '}
              <Input
                w="200px"
                onChange={e => {
                  setNewPost(e.target.value);
                }}
                placeholder="Add Post"
                textAlign="center"
                background="rgba(88, 141, 233, 0.486)"
              ></Input>
              <Button onClick={addpost}>Add Post</Button>
            </VStack>
            {post.map(e => (
              <>
                <Link mr="400" color="rgb(9, 161, 90)" fontSize="12px">
                  {e.userId.username}
                </Link>{' '}
                <Text fontSize="12px" fontFamily="Verdana">
                  Post: {e.description}
                </Text><Input
                      
                      onChange={e => {
                        setNewComment(e.target.value);
                      }}
                      placeholder="add comment"
                    />
                    <Button
                    mt='4'
                      
                      onClick={() => addcomment(e._id)}
                    >
                      Reply
                    </Button>
                {e.commentId.map((s,i) => (
                  <Box  mt="4"  >
                    <Text fontSize="12px" fontFamily="Verdana" color="gold">
                      {s.description}
                    </Text>{' '}
                    
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
