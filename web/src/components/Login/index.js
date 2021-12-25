import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
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
const BASE_URL = process.env.REACT_APP_BASE_URL
const Login = () => {
    const [email,setEmail] = useState("")
    const [username , setUsername] = useState("")
    const [ password, setPassword] = useState("")
    const [local , setLocal] = useState("")
    const navigate = useNavigate()
    const state = useSelector(state =>{
        return {
            Login : state.Login,
            postRD : state.PostRD
        }
    })
    const dispatch = useDispatch()
    return (
        <div>
            <h1>Login "" </h1>
        </div>
    )
}

export default Login;
