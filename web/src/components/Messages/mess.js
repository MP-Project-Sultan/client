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

const Mess = () => {
  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  const [messages, setMessages] = useState([]);
  const [NewMewssage, setNewMewssage] = useState('');
  const { id } = useParams();
  useEffect(() => {
    result();
  }, []);
  const result = async () => {
    try {
      await axios
        .get(`http://localhost:5000/getmsg/${id}`, {
          headers: { authorization: `Bearer ${state.Login.token}` },
        })
        .then(result => {
          setMessages(result.data);
          console.log(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {messages.length &&
        messages.map(e => (
          <>
         {e.message.map(s=>(console.log(s.content)))}
            
          </>
        ))}
      <h1>{messages._id}</h1>
    </div>
  );
};

export default Mess;
