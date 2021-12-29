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
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    result();
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
  return (
    <>
      <ChakraProvider theme={theme}>
        <VStack>
          <Box
            w="600px"
            mt="1%"
            border="solid 2px gray"
            padding="20px"
            borderRadius="4"
          >
            {comments.length && <h1>{comments[0].postId.description}</h1>}
            <hr />{' '}
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
                    />
                    <Link mr="400" color="rgb(9, 161, 90)" fontSize="12px">
                      {item.userId.username}
                    </Link>
                  </HStack>
                  <Text>{item.description}</Text>
                </div>
              );
            })}{' '}
            <>
              <Input
                onChange={e => {
                  setNewComment(e.target.value);
                }}
                placeholder="add comment"
                w="250"
              />
              <Button ml="4" onClick={e => addcomment(id)}>
                {' '}
                Reply
              </Button>
            </>
            {/* <Button onClick={Nav('/posts')}></Button> */}
          </Box>
        </VStack>
      </ChakraProvider>
    </>
  );
}
