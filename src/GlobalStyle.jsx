import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('path/to/font/font.ttf');
  body {
    font-family: 'Nanum Gothic', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #bbb;
    background-image: url('/img/backGroundImg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: multiply;

    animation: slideShow 40s infinite;
  }


  /* 배경 이미지 설정 */
  @keyframes slideShow {
    0%, 100% {
      background-image: url('/img/backGroundImg2.jpg');
      opacity: 1;
    }
    25% {
      background-image: url('/img/backGroundImg.jpg');
      opacity: 1;
    }
    50% {
      background-image: url('/img/backGroundImg3.jpg');
      opacity: 1;
    }
    75% {
      background-image: url('/img/backGroundImg4.jpg');
      opacity: 1;
    }
  }
`;

export default GlobalStyle;
