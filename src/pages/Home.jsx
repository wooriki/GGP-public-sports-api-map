import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { setLocation } from '../redux/modules/userLocation';
import { styled, keyframes } from 'styled-components';
import Facilities from '../components/Facilities';
import Search from '../components/Search';
import MapComponent from '../components/map/MapComponent';
import Detail from '../components/detail/Detail';
import Header from '../components/common/Header';

const Home = () => {
  const dispatch = useDispatch();
  const { location, error } = useCurrentLocation();
  const [facility, setFacility] = useState(null);
  const [filteredGlobalDataByArea, setFilteredGlobalDataByArea] = useState(null);
  const [globalSearch, setGlobalSearch] = useState(null);

  useEffect(() => {
    if (location) {
      dispatch(setLocation({ latitude: location.latitude, longitude: location.longitude }));
    }
  }, [dispatch, location]);

  return (
    <>
      <Header setFilteredGlobalDataByArea={setFilteredGlobalDataByArea} setGlobalSearch={setGlobalSearch} />
      <ContainerWrapper>
        <StyledMain>
          <div>
            {/* <TitleTag>Now Loading Map</TitleTag> */}
            <MapComponent />
          </div>
          <OptionalTag>
            <TextTag>💥추천 영상</TextTag>
            <UlTag>
              <LiTag>1</LiTag>
              <LiTag>2</LiTag>
              <LiTag>3</LiTag>
              <LiTag>4</LiTag>
              <LiTag>5</LiTag>
            </UlTag>
          </OptionalTag>
        </StyledMain>
        {facility ? (
          <Detail setFacility={setFacility} facility={facility} />
        ) : (
          <Facilities
            filteredGlobalDataByArea={filteredGlobalDataByArea}
            globalSearch={globalSearch}
            setFacility={setFacility}
          />
        )}
      </ContainerWrapper>
    </>
  );
};
// 마커에 대한 state
//

export default Home;

const ContainerWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(41, 41, 41, 0.747);
  padding: 0 0 0 30px;
  border-radius: 30px;
`;
const StyledMain = styled.main`
  width: 65%;
  color: rgba(236, 236, 236, 0.89);
  border-radius: 30px 0 0 30px;
`;
const TitleTag = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding: 10px 20px;
  width: 250px;
  // background-color: rgba(77, 77, 77, 0.776);
  border-radius: 14px 0 0;
`;
const OptionalTag = styled.div`
  margin-top: 40px;
`;
const TextTag = styled.h2`
  font-size: 1.5rem;
  margin-top: 20px;
`;
const UlTag = styled.ul`
  // display: flex;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;
const growAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const LiTag = styled.li`
  height: 140px;
  border: 1px black solid;
  margin: 40px 10px 20px;
  padding: 40px 60px;
  border-radius: 10px;
  border: none;
  background-color: rgba(179, 179, 179, 0.476);
  cursor: pointer;
  &:hover {
    animation: ${growAnimation} 0.5s ease-in-out;
    background-color: rgba(225, 225, 225, 0.45);
  }
`;

// 에러나면 Home에서 export const Home 아니면 export default Home으로 바꾸기
