import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { setLocation } from '../redux/modules/userLocation';
import Facilities from '../components/Facilities';
import Search from '../components/Search';
import { styled } from 'styled-components';
import MapComponent from '../components/map/MapComponent';

const Home = () => {
  const dispatch = useDispatch();
  const { location, error } = useCurrentLocation();

  useEffect(() => {
    if (location) {
      dispatch(setLocation({ latitude: location.latitude, longitude: location.longitude }));
    }
  }, [dispatch, location]);

  return (
    <>
      <h1>Home</h1>
      <Facilities />
      <StyledMain>
        <div>
          <MapComponent />
        </div>
      </StyledMain>
    </>
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

// 에러나면 Home에서 export const Home 아니면 export default Home으로 바꾸기
