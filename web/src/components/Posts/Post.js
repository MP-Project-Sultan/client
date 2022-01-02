import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { PhoneIcon, AddIcon, WarningIcon, StarIcon } from '@chakra-ui/icons';
import axios from 'axios';
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

export default function Post() {
  const [comments, setComments] = useState([]);
  const Nav = useNavigate();

  const [newcomment, setNewComment] = useState('');
    const [post, setPost] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  const { id } = useParams();
  useEffect(() => {
    result();
    
  }, []);

   useEffect(() => {
     result1();
   }, []);
  const result = async () => {
    await axios
      .get(`http://localhost:5000/getComments/${id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setComments(result.data);
      });
  };
  const result1 = async () => {
    await axios
      .get(`http://localhost:5000/getPostById/${comments[0].postId._id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setPost(result.data);
        console.log(result.data);
      });
      
  };
  const addcomment = async postId => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addComment`,
        {
          description: newcomment,
          postId,
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
  const redirect = () => {
    Nav('/posts');
  };
  
    const addVot = async commentId => {
     try {
       const res = await axios.post(
         `${BASE_URL}/addVot`,
         {
           commentId: commentId,
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
    <Box bg="rgba(252, 252, 252, 0.815)">
      <>
        <ChakraProvider theme={theme}>
          <VStack>
            <Box
              background="rgba(252, 252, 252, 0.815)"
              w="600px"
              mt="1%"
              border="solid 2px gray"
              padding="20px"
              borderRadius="4"
            >
              {comments.length && (
                <>
                  {' '}
                  {console.log(comments[0].postId._id)}
                  <Text mb="9" color="black" fontFamily="Roman" fontSize="20">
                    {comments[0].postId.description}
                  </Text>
                </>
              )}
              <hr />
              <>
                <Box mt="8">
                  {' '}
                  <Input
                    onChange={e => {
                      setNewComment(e.target.value);
                    }}
                    placeholder="add comment"
                    w="250"
                    textAlign="center"
                  />
                  <Button ml="4" onClick={e => addcomment(id)}>
                    {' '}
                    Reply
                  </Button>
                </Box>{' '}
              </>{' '}
              {comments.map((item, index) => {
                return (
                  <div key={item._id}>
                    {' '}
                    <HStack>
                      {' '}
                      <Image
                        display="inline"
                        w="5"
                        borderRadius="full"
                        src="https://th.bing.com/th/id/R.0e0adfcf50b345161a6a5b47bb8b5f07?rik=cPwI89xNfVXFeQ&riu=http%3a%2f%2fwww.hexatar.com%2fgallery%2fpng%2f190418_124617_m2230fe8f39_avatar.png&ehk=RZX%2bKqAnJJ0UsHx9nSjX7%2b6AduRMrKDy90w7JqaxOlE%3d&risl=&pid=ImgRaw&r=0"
                      />{' '}
                      <Link
                        onClick={() => Nav(`/profile/${item.userId._id}`)}
                        mr="400"
                        color="gold"
                        fontSize="12px"
                        as="strong"
                      >
                        by {item.userId.username}
                      </Link>{' '}
                      <Text
                        color="black"
                        onClick={() => Nav(`/profile/${item.userId._id}`)}
                        mr="400"
                        fontSize="12px"
                      >
                        on on {item.time.slice(0, 10)} {item.time.slice(11, 16)}
                      </Text>
                      <br />
                      <ht />
                    </HStack>
                    <Box mt="5" position="right">
                      <HStack>
                        <StarIcon
                          w="3"
                          cursor="pointer"
                          color="#c5a087"
                          onClick={() => addVot(item._id)}
                        >
                          Like{' '}
                        </StarIcon>
                        <Text fontSize="12px" fontFamily="Roman" color="gold">
                          {item.vot.length}
                        </Text>
                      </HStack>{' '}
                    </Box>
                    <Text
                      h="100"
                      pt="33"
                      border="solid gray 2px"
                      borderRadius="3"
                      m="8"
                      color="black"
                      fontSize="15px"
                    >
                      {item.description}
                    </Text>
                  </div>
                );
              })}{' '}
              <Button onClick={redirect}>Back</Button>{' '}
            </Box>
          </VStack>
        </ChakraProvider>
      </>
    </Box>
  );
}
