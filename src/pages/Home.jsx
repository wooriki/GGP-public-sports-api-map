import React from 'react';
import { styled } from 'styled-components';
import MapComponent from '../components/map/MapComponent';

const Home = () => {
  return (
    <StyledMain>
      <div>
        <div className="home-temp-div"></div>
        {/* <div className="home-temp-div"></div> */}
        <MapComponent />
      </div>
    </StyledMain>
  );
};

export default Home;

const StyledMain = styled.main`
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px black solid;

  > div {
    display: flex;
    gap: 2rem;
  }

  .home-temp-div {
    width: 330px;
    height: 650px;
    border-radius: 20px;
    box-shadow: 1px 1px 10px 0 #bbb;
  }
  .home-temp-div.second {
    width: 660px;
  }
`;
