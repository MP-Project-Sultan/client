import React, { useEffect, useState } from 'react';
import {
  Nav,
  NavLogo,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import { logout } from '../../Reducer/login';

import { ChakraProvider, Box, Image } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
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

  return (
    <>
      <Nav>
        <NavLogo to="/">
          <Image
            alt="logo"
            position="relative"
            right="120"
            mb="1"
            w="17"
            h="10"
            src="/logo2.png"
          />
        </NavLogo>
        <Bars />
        <Box ml="650px" position="absolute" fontSize="15">
          <NavMenu>
            <NavLink to="/" activeStyle>
              Home
            </NavLink>
            <NavLink to="/posts" activeStyle>
              Questions
            </NavLink>
            <NavLink to="/news" activeStyle>
              All News
            </NavLink>
            {!logedin ? (
              <>
                <NavLink to="/register" activeStyle>
                  Register
                </NavLink>
                <NavBtn>
                  <NavBtnLink to="/Login">Login</NavBtnLink>
                </NavBtn>
              </>
            ) : (
              <>
                <NavBtn
                  onClick={() => {
                    dispatch(logout());
                    setLogedin(false);
                  }}
                >
                  <NavBtnLink to="/login">Logout</NavBtnLink>
                </NavBtn>
              </>
            )}
          </NavMenu>
        </Box>
      </Nav>
    </>
  );
};
export default Navbar;
