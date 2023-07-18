import styled, { createGlobalStyle, css } from 'styled-components';
import Comments from '../components/Comments';
import Comments2 from '../components/Comments2';
import { useState } from 'react';

const GlobalStyle = createGlobalStyle`
*{  
  box-sizing: border-box;
}
html {
  font-size : 10px;
}
body {
  width: 100%;
  margin: 0;
}
`;

const Home = () => {
  const [cold, setCold] = useState();

  return (
    <Wrapper className="App" cold={cold}>
      <GlobalStyle />
      <Comments setCold={setCold} />
      home
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: burlywood;
  ${(props) =>
    props.cold &&
    css`
      background-color: skyblue;
    `}
`;
