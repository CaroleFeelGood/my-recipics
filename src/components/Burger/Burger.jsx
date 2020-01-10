import React from 'react';
import { StyledBurger } from './Burger.styled.js';
import { bool, func } from 'prop-types';
const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger
      open={open}
      onClick={() => {
        console.log('open', open);
        setOpen(!open);
      }}
    >
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};
Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired
};

export default Burger;
