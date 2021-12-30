import React, { useState, useEffect } from 'react';
import { getpost, addpost, delpost } from '../../Reducer/post';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
} from '@chakra-ui/react';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Cpanel = () => {
  const [newpost, setNewPost] = useState('');
  const [newcomment, setNewComment] = useState('');

  const dispatch = useDispatch();

  const state = useSelector(state => {
    return state;
  });

  useEffect(() => {
    setNewPost('m');
    postshow();
  }, []);

  const postshow = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getPostsAdmin`, {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });

      dispatch(getpost(result.data));

    } catch (error) {
      console.log(error);
    }
  };

  const del = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/deletePost/${id}`, {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });

      postshow();
    } catch (error) {
      console.log(error);
    }
  };

  

  const addpost = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addPost`,
        {
          description: newpost,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );

      postshow();
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

      postshow();
    } catch (error) {
      console.log(error);
    }
  };
  const addlike = async postId => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addLike`,
        {
          postId: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );

      postshow();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ChakraProvider theme={theme}>
      <Box bg="rgba(0, 0, 0, 0.87)">
        {' '}
        <VStack>
          {' '}
          <Box
            bg="rgba(6, 6, 7, 0.226)"
            w="800px"
            mt="1%"
            border="solid 2px gray"
            padding="20px"
            borderRadius="4"
          >
            <VStack>
              <Text color="white">POSTS</Text>
              <Input
                color="white"
                onChange={e => {
                  setNewPost(e.target.value);
                }}
                placeholder="add Post"
              />
              <Button onClick={addpost}>add</Button>
              {newpost && newpost.length && (
                <>

                  {state.postRD.post.map((e, i) => (
                    // <div className="list">
                    <>
                      <Text
                        color="white"
                        border="solid 1px black"
                        fontSize="30px"
                      >
                        {e.description}
                      </Text>
                      <img src={e.img} />
                      {e.commentId.map(s => (
                        <>
                          <Text
                            color="white"
                            border="solid 1px red"
                            fontSize="15px"
                          >
                            {' '}
                            Comment: {s.description}
                          </Text>
                        </>
                      ))}
                      {/* {e.like.map(s => (
                    <>
                      <p className="pargraph">  {s.length}</p>
                    </>
                  ))} */}

                      <Button
                        onClick={() => {
                          del(e._id);
                        }}
                      >
                        delete
                      </Button>
                      <Input
                        color="white"
                        onChange={e => {
                          setNewComment(e.target.value);
                        }}
                        placeholder="add comment"
                      />
                      <Button onClick={() => addcomment(e._id)}>add</Button>
                      <br />
                      <Button onClick={() => addlike(e._id)}>Like </Button>
                      <Text color="white">{e.like.length}</Text>
                    </>
                  ))}
                </>
              )}
            </VStack>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Cpanel;
