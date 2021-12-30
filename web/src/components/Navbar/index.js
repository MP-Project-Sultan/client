import React from 'react';
import {
  Nav,
  NavLogo,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import {
  ChakraProvider,
  Box,

  Image,
} from '@chakra-ui/react';

const Navbar = () => {
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
        <Box ml="650px" position="absolute" fontSize='15'>
          <NavMenu>
            <NavLink to="/" activeStyle>
              Home
            </NavLink>
            <NavLink to="/posts" activeStyle>
              Questions
            </NavLink>
            <NavLink to="/contact" activeStyle>
              Contact
            </NavLink>
            <NavLink to="/register" activeStyle>
              Register
            </NavLink>
            <NavBtn>
              <NavBtnLink to="/Login">Login</NavBtnLink>
            </NavBtn>
          </NavMenu>
        </Box>
      </Nav>
    </>
  );
};
export default Navbar;
