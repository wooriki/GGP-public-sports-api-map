import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { setLocation } from '../redux/modules/userLocation';
import { styled, keyframes } from 'styled-components';
import Facilities from '../components/Facilities';
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
    <Mother>
      <Header setFilteredGlobalDataByArea={setFilteredGlobalDataByArea} setGlobalSearch={setGlobalSearch} />
      <ContainerWrapper>
        <StyledDivForLeft>
          <MapComponent />
          <StyledRecommendation>
            <div id="recommendation-title">
              <h2>💥 추천 영상</h2>
            </div>
            <StyledVideoContainer>
              <StyledVideo onClick={() => window.open('https://youtu.be/Bbw_KiiBuU4', '_blank')}>
                <img src="https://i.ibb.co/4Z3hRBv/1-Small.jpg" alt="video thumbnail" />
                <p>공공체육시설은 동호회 차지?…술판 벌이기도 (2020.11.17/뉴스데스크/MBC)</p>
              </StyledVideo>
              <StyledVideo onClick={() => window.open('https://youtu.be/fVXPa7lOVo8', '_blank')}>
                <img src="https://i.ibb.co/zZ8VTrB/2-Small.jpg" alt="video thumbnail" />
                <p>생활체육 재도약의 조건…체육시설과 스포츠클럽 확대 [9시 뉴스] / KBS 2023.04.26.</p>
              </StyledVideo>
              <StyledVideo onClick={() => window.open('https://youtu.be/lRX2_JBGvgU', '_blank')}>
                <img src="https://i.ibb.co/NW7yJ1R/3-Small.jpg" alt="video thumbnail" />
                <p>갈 곳 없는 노인 스포츠, 유럽형 스포츠클럽 도입이 해법 / KBS뉴스(News)</p>
              </StyledVideo>
              <StyledVideo onClick={() => window.open('https://youtu.be/7iHnAGukoUk', '_blank')}>
                <img src="https://i.ibb.co/Zd0Dr07/4-Small.jpg" alt="video thumbnail" />
                <p>2025년까지 공공체육시설 11곳 확충</p>
              </StyledVideo>
              <StyledVideo onClick={() => window.open('https://youtu.be/GhVxqe1QhYk', '_blank')}>
                <img src="https://i.ibb.co/P4dS7Dp/5-Small.jpg" alt="video thumbnail" />
                <p>2025년까지 공공체육시설 11곳 확충</p>
              </StyledVideo>
              <StyledVideo onClick={() => window.open('https://youtu.be/kSLN7-ATYuo', '_blank')}>
                <img src="https://i.ibb.co/dgdYJJ8/6-Small.jpg" alt="video thumbnail" />
                <p>2025년까지 공공체육시설 11곳 확충</p>
              </StyledVideo>
            </StyledVideoContainer>
          </StyledRecommendation>
        </StyledDivForLeft>
        <StyledDivForRight>
          {facility ? (
            <Detail setFacility={setFacility} facility={facility} />
          ) : (
            <Facilities
              filteredGlobalDataByArea={filteredGlobalDataByArea}
              globalSearch={globalSearch}
              setFacility={setFacility}
            />
          )}
        </StyledDivForRight>
      </ContainerWrapper>
    </Mother>
  );
};
// 마커에 대한 state
//

export default Home;

const Mother = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
`;

const ContainerWrapper = styled.main`
  width: 85%;
  height: 80vh;
  overflow: hidden;
  display: flex;
  border-radius: 20px;
  gap: 0.75rem;
`;
const StyledDivForLeft = styled.div`
  height: 100%;
  width: 60%;
  color: rgba(236, 236, 236, 0.89);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
const StyledRecommendation = styled.div`
  background-color: rgba(25, 25, 25, 0.95);
  border-radius: 20px;
  height: 30%;

  #recommendation-title {
    height: 20%;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const StyledVideoContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  height: 80%;
  overflow: auto;
  padding: 1rem 0.75rem;
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

const StyledVideo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 150px;
  height: 50%;
  min-height: 90px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    animation: ${growAnimation} 0.3s ease-in-out;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  p {
    font-size: 0.9rem;
    color: #eee;
    line-height: 1.1;
  }
`;

const StyledDivForRight = styled.div`
  width: 40%;
  border-radius: 20px;
  overflow: auto;
`;
