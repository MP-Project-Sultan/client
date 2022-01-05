import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ChatIcon, DeleteIcon, StarIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
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
  const [newPost, setNewPost] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [logedin, setLogedin] = useState(false);
  const [show, setshow] = useState(false);
    const [rmable, setRmable] = useState(false);
     const dispatch = useDispatch()

  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
      console.log(state);


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
      .get(`${BASE_URL}/getPosts`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setPost(result.data);
      });
  };
  const addpost = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addPost`,
        {
          description: newPost,
          title: newTitle,
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
      <Box pt="5" pb="6" bg="rgba(242, 242, 242, 1)">
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
                  {show ? (
                    <>
                      {' '}
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
                      <Button
                        bg="rgb(48,47,47)"
                        color="white"
                        onClick={() => {
                          addpost();
                          setshow(false);
                        }}
                      >
                        Submit
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                  <Button
                    bg="rgb(48,47,47)"
                    color="white"
                    onClick={() => setshow(true)}
                  >
                    Add Post
                  </Button>
                </>
              )}
            </VStack>
            {post.map(e => (
              <Box
                bg="white"
                borderRadius="4"
                boxShadow="md"
                p="2"
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
                <Text
                  cursor="pointer"
                  onClick={() => Nav(`/post/${e._id}`)}
                  fontSize="18px"
                  fontFamily="mono"
                  color="black"
                >
                  {e.title}
                </Text>
             
                <HStack>  <ChatIcon
                  cursor="pointer"
                  onClick={() => Nav(`/post/${e._id}`)}
                  fontSize="13px"
                  fontFamily="mono"
                  color="black"
                >
                  
                </ChatIcon><Text as='strong' fontSize='12'>{e.commentId.length}</Text>
                  {' '}
                  <StarIcon
                    w="3"
                    cursor="pointer"
                    color="#c5a087"
                    onClick={() => addlike(e._id)}
                  >
                    Like{' '}
                  </StarIcon>{' '}
                  )
                  <Text
                    as="strong"
                    fontSize="12px"
                    fontFamily="Roman"
                    color="gold"
                  >
                    {e.like.length}
                  </Text>
                  <>
                    {' '}
                    {!logedin || e.userId._id != state.Login.user._id ? (
                      <></>
                    ) : (
                      <DeleteIcon
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
                      </DeleteIcon>
                    )}
                  </>
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
