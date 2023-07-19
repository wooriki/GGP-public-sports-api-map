import React from 'react';
import { styled } from 'styled-components';
import MapComponent from '../components/map/MapComponent';

const Home = () => {
  return (
    <StyledMain>
      <div>
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
`;
