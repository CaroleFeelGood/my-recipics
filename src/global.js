import {
  createGlobalStyle
} from 'styled-components';

export const GlobalStyles = createGlobalStyle `
@import url('https://fonts.googleapis.com/css?family=Maven+Pro&display=swap');
  html, body {
    margin: 0;
    padding: 0;
  }
  *, *::after, *::before {
    /* box-sizing: border-box; */
  }
  body {
    /* align-items: center; */
    /* background: #0D0C1D; */
    /* color: #EFFFFA; */
    /* background-color: #F8F8F4;
    /* background: ${
      ({
        theme
      }) => theme.primaryDark
    };
    color: ${
      ({
        theme
      }) => theme.primaryLight
    }; */
    /* background-image: url("/images/background_poireaux.jpeg"); */
    /* background-repeat: no - repeat;
    background-position: right;
    background-size: 100% ; */ 

    /* display: flex; */
      font-family: 'Maven Pro',
        sans - serif;
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; */
    /* height: 100vh;
    /* justify-content: center; */
    /* text-rendering: optimizeLegibility;  */
  }

  h1 {
    /* font-size: 2rem;
    text-align: center;
    text-transform: uppercase; */
  }
  img {
    /* border-radius: 5px;
    height: auto;
    width: 10rem; */
  }
  div {
    /* text-align: center; */
  }
  small {
    /* display: block; */
  }
  a {
    /* color: ${({ theme }) => theme.primaryHover};
    text-decoration: none; */
  }
`