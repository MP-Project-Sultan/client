import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { sign } from '../../Reducer/login';
import { getpost, addpost, delpost } from '../../Reducer/post';
import { DeleteIcon, StarIcon } from '@chakra-ui/icons';
import Post from './Post';
import { useNavigate } from 'react-router-dom';

import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Icon,
  Input,
  Button,
  Link,
  Image,
  HStack,
} from '@chakra-ui/react';

const Posts = () => {
  const Nav = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState();
  const [newPost, setNewPost] = useState('');
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState('');
   const [logedin, setLogedin] = useState(false);

   const state = useSelector(state => {
     return {
       Login: state.Login,
       postRD: state.PostRD,
     };
   });

   useEffect(() => {
     if (state.Login.token) {
       setLogedin(true);
     } else {
       setLogedin(false);
     }
   }, [state]);
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
          title: newTitle
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

  const del = async id => {
    try {
      const res = await axios.delete(`${BASE_URL}/deletePost/${id}`, {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });

      result();
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

      result();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ChakraProvider theme={theme}>
      <Box bg="rgba(252, 252, 252, 0.815)">
        <VStack>
          <Box
            bg="rgba(252, 252, 252, 0.815)"
            w="800px"
            mt="1%"
            border="solid 1px black"
            padding="20px"
            borderRadius="4"
          >
            <VStack>
              {' '}
              {!logedin ? (
                <></>
              ) : (
                <>
                  <Input
                    w="200px"
                    onChange={e => {
                      setNewTitle(e.target.value);
                    }}
                    placeholder="Title"
                    textAlign="center"
                  ></Input>
                  <Input
                    w="200px"
                    color="black"
                    onChange={e => {
                      setNewPost(e.target.value);
                    }}
                    placeholder="Description"
                    textAlign="center"
                  ></Input>{' '}
                  <Button onClick={addpost}>Add Post</Button>
                </>
              )}
            </VStack>
            {post.map(e => (
              <Box
                bg="white"
                borderRadius="4"
                boxShadow='"md"'
                p="2"
                // border="solid black 1px"
                mt="6"
                key={e._id}
              >
                <HStack>
                  <Image
                    display="inline"
                    w="5"
                    borderRadius="full"
                    src="https://th.bing.com/th/id/R.0e0adfcf50b345161a6a5b47bb8b5f07?rik=cPwI89xNfVXFeQ&riu=http%3a%2f%2fwww.hexatar.com%2fgallery%2fpng%2f190418_124617_m2230fe8f39_avatar.png&ehk=RZX%2bKqAnJJ0UsHx9nSjX7%2b6AduRMrKDy90w7JqaxOlE%3d&risl=&pid=ImgRaw&r=0"
                  />
                  <Link
                    onClick={() => Nav(`/profile/${e.userId._id}`)}
                    mr="400"
                    color="gold"
                    fontSize="12px"
                    as="strong"
                  >
                    {e.userId.username}
                  </Link>
                  <Text color="black" fontSize="12px">
                    on {e.time.slice(0, 10)} {e.time.slice(11, 16)}
                  </Text>
                </HStack>
                <Text
                  cursor="pointer"
                  onClick={() => Nav(`/post/${e._id}`)}
                  fontSize="18px"
                  fontFamily="mono"
                  color="black"
                >
                  {e.title}
                </Text>
                <HStack>
                  {' '}
                <StarIcon
                    w="3"
                    cursor="pointer"
                    color="#c5a087"
                    onClick={() => addlike(e._id)}
                  >
                    Like{' '}
                  </StarIcon> )
                  <Text
                    as="strong"
                    fontSize="12px"
                    fontFamily="Roman"
                    color="gold"
                  >
                    {e.like.length}
                  </Text>
                <> {!logedin ? (
                <></>
              ) : ( <DeleteIcon
                    w="3"
                    cursor="pointer"
                    position="absolute"
                    left="971"
                    marginBottom="33"
                    onClick={() => {
                      del(e._id);
                    }}
                  >
                    delete
                  </DeleteIcon> )}</>
                </HStack>{' '}
              </Box>
            ))}
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Posts;
