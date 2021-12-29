import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { sign } from '../../Reducer/login';
import { getpost, addpost, delpost } from '../../Reducer/post';
import { DeleteIcon, StarIcon } from '@chakra-ui/icons';
import Post from "./Post"
import {useNavigate} from 'react-router-dom'


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
  const Nav = useNavigate()
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [post, setPost] = useState([]);
   const [comments, setComments] = useState([]);
  const [like, setLike] = useState();
  const [newPost, setNewPost] = useState('');
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
      <Box>
        <VStack>
          <Box
            w="600px"
            mt="1%"
            border="solid 2px gray"
            padding="20px"
            borderRadius="4"
          >
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
              <Box
                borderRadius="4"
                boxShadow="dark-lg"
                p="2"
                border="solid gray"
                m="2"
                key={e._id}
              >
                <HStack>
                  <Image
                    display="inline"
                    w="5"
                    borderRadius="full"
                    src="https://th.bing.com/th/id/R.0e0adfcf50b345161a6a5b47bb8b5f07?rik=cPwI89xNfVXFeQ&riu=http%3a%2f%2fwww.hexatar.com%2fgallery%2fpng%2f190418_124617_m2230fe8f39_avatar.png&ehk=RZX%2bKqAnJJ0UsHx9nSjX7%2b6AduRMrKDy90w7JqaxOlE%3d&risl=&pid=ImgRaw&r=0"
                  />
                  <Link mr="400" color="rgb(9, 161, 90)" fontSize="12px">
                    {e.userId.username}
                  </Link>
                </HStack>
                <Link
                  cursor="pointer"
                  onClick={() => Nav(`/post/${e._id}`)}
                  fontSize="18px"
                  fontFamily="mono"
                >
                  {e.description}
                </Link>
                {/* <Input
                  onChange={e => {
                    setNewComment(e.target.value);
                  }}
                  placeholder="add comment"
                  w="250"
                /> */}
                <HStack>
                  {' '}
                  <StarIcon
                  w='3'
                    cursor="pointer"
                    color="#c5a087"
                    onClick={() => addlike(e._id)}
                  >
                    Like{' '}
                  </StarIcon>
                  <Text fontSize="12px" fontFamily="Roman" color="green" >
                    {e.like.length}
                  </Text>
                  
              <DeleteIcon
                w='3'
                    cursor="pointer"
                    position="absolute"
                    left='873'
                   
                    marginBottom='33'
                    onClick={() => {
                      del(e._id);
                    }}
                  >
                    delete
                  </DeleteIcon>  </HStack>{' '}
                {/* <Button ml="4" onClick={() => Nav(`/post/${e._id}`)}>
                  {' '}
                  Read More...
                </Button> */}
                {/* <Button ml="4" onClick={() => addcomment(e._id)}>
                  {' '}
                  Reply
                </Button> */}
                {/* <Post postId={e._id} /> */}
                {/* {e.commentId.map((s, i) => (
                  <Box mt="4">
                    <Text fontSize="12px" fontFamily="Verdana" color="gold">
                      {s.description}
                    </Text>{' '}
                    <Text> {console.log(s)}</Text>
                  </Box>
                ))} */}
              </Box>
            ))}
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Posts;
